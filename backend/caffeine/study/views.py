import json
import datetime
import time
import requests
from json import JSONDecodeError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import DailyStudyRecord, DailyStudyForSubject, Concentration
from .signals import inference_happen, join_group, leave_group
from user.models import User
from group.models import StudyRoom
import math

rot = ['top', 'right', 'bottom', 'left']
xyz = ['x', 'y', 'z']


def calculate_ear(eye):
    vertcal_sum = 0
    horigental_sum = 0
    for index in xyz:
        vertcal_sum += (eye['top'][index] - eye['bottom'][index]) ** 2
        horigental_sum += (eye['left'][index] - eye['right'][index]) ** 2
    vertic = math.sqrt(vertcal_sum)
    horigental = math.sqrt(horigental_sum)
    return vertic / horigental

@require_http_methods(['POST', 'PUT'])
def study_tune(request):
    req_data = json.loads(request.body.decode())
    user = User.objects.get(id=request.user.id)
    img = req_data['image']
    api_url = 'https://vision.googleapis.com/v1/images:annotate?key='
    key = 'AIzaSyC4Q4MCBS78pxzDk0dJCM6uAGoKMs866RM'
    api_url += key
    if img is None:
        return HttpResponse(status=400)
    image = img.split(',')[1]
    _features = [{
        "type": "FACE_DETECTION",
        "maxResults": 1
    }
    ]
    _features_label = [{
        "type": "LABEL_DETECTION",
        "maxResults": 10
    },
    ]
    _image = {
        'content': image
    }
    data = {
        "requests": [{
            'image': _image,
            'features': [_features]
        }
        ]
    }
    response = requests.post(api_url, json=data)
    # print(response_label.json()['responses'])
    response = response.json()
    if response['responses'][0] == {}:  # 얼굴이 없을 때
        return HttpResponse(status=400)
    else:
        face = response['responses'][0]['faceAnnotations'][0]
        landmarks = face['landmarks']
        left = {}
        right = {}
        for i in range(4):
            left[rot[i]] = landmarks[16 + i]['position']
            right[rot[i]] = landmarks[20 + i]['position']
        left_ear = calculate_ear(left)
        right_ear = calculate_ear(right)
        if request.method == 'POST':  # open
            user.open_eye_left = left_ear
            user.open_eye_right = right_ear
            user.save()
            return HttpResponse(status=204)
        else:  # close
            user.close_eye_left = left_ear
            user.close_eye_right = right_ear
            user.save()
            return HttpResponse(status=204)


# Create your views here.
def study_room(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        group_id = req_data['group_id']
        room = StudyRoom.objects.get(group__id=group_id)
        if room.active_studys.count() >= 5:
            return HttpResponse(status=400)
        user = User.objects.get(id=request.user.id)
        today_study = user.daily_record.filter(date=datetime.date.today())
        if not today_study:
            today_study = DailyStudyRecord(user=user)
            today_study.save()
        if DailyStudyForSubject.objects.filter(user__id=request.user.id, is_active=True):
            current_study = DailyStudyForSubject.objects.get(
                user__id=request.user.id, is_active=True
            )
            today_study = user.daily_record.filter(date=datetime.date.today()).first()
            today_study.total_study_time += current_study.study_time
            today_study.total_study_time += current_study.distracted_time
            today_study.total_concentration += current_study.study_time
            if today_study.total_study_time != datetime.timedelta(0):
                today_study.total_gauge = (today_study.total_concentration /
                                           today_study.total_study_time)
            current_study.is_active = False
            current_study.save()
            today_study.save()
            room.active_studys.remove(current_study)
        subject = req_data['subject']
        current_study = DailyStudyForSubject(subject=subject, is_active=True, user=user)
        current_study.save()
        room.active_studys.add(current_study)
        room.save()
        prev_room = [study_info for study_info in
                     room.active_studys.all().values(
                         'concentration_gauge', 'user__id', 'user__name', 'user__message')]
        join_group.send(
            sender='study_room', name=user.name, user_id=user.id,
            group_id=group_id, message=user.message)
        return JsonResponse({'subject': subject, 'members': prev_room}, safe=False)
    elif request.method == 'PUT':
        user = User.objects.get(id=request.user.id)
        req_data = json.loads(request.body.decode())
        group_id = req_data['group_id']
        current_study = DailyStudyForSubject.objects.get(user__id=request.user.id, is_active=True)
        today_study = user.daily_record.filter(date=datetime.date.today()).first()
        today_study.total_study_time += current_study.study_time
        today_study.total_study_time += current_study.distracted_time
        today_study.total_concentration += current_study.study_time
        if today_study.total_study_time != datetime.timedelta(0):
            today_study.total_gauge = (today_study.total_concentration /
                                       today_study.total_study_time)
        current_study.is_active = False
        current_study.save()
        today_study.save()
        room = StudyRoom.objects.get(group__id=group_id)
        room.active_studys.remove(current_study)
        room.save()
        if room.active_studys.exists():
            leave_group.send(
                sender='study_room', name=user.name, user_id=user.id, group_id=group_id
            )
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'DELETE'])


def study_infer(request):
    state = 0
    req_data = json.loads(request.body.decode())
    img = req_data['image']
    simage = req_data['simage']
    group_id = req_data['id']
    eye_data = User.objects.filter(id=request.user.id).values('open_eye_left',
                'close_eye_left', 'open_eye_right', 'close_eye_right')[0]
    api_url = 'https://vision.googleapis.com/v1/images:annotate?key='
    key = 'AIzaSyC4Q4MCBS78pxzDk0dJCM6uAGoKMs866RM'
    api_url += key
    image = img.split(',')[1]
    _features = [{
        "type": "FACE_DETECTION",
        "maxResults": 1
    }
    ]
    _features_label = [{
        "type": "LABEL_DETECTION",
        "maxResults": 10
    },
    ]
    _image = {
        'content': image
    }
    data = {
        "requests": [{
            'image': _image,
            'features': [_features]
        }
        ]
    }
    start = time.time()
    response = requests.post(api_url, json=data)
    data['requests'][0]['features'] = [_features_label]
    response_label = requests.post(api_url, json=data)
    print("time :", time.time() - start)
    # print(response_label.json()['responses'])
    response = response.json()
    if response['responses'][0] == {}:
        state = 1
    else:
        face = response['responses'][0]['faceAnnotations'][0]
        landmarks = face['landmarks']
        pan = face['panAngle']
        tilt = face['tiltAngle']
        print(pan, tilt)
        if abs(pan) > 30 or tilt < -20 or tilt > 20:
            state = 2
        else:
            left = {}
            right = {}
            for i in range(4):
                left[rot[i]] = landmarks[16 + i]['position']
                right[rot[i]] = landmarks[20 + i]['position']
            left_ear = calculate_ear(left)
            right_ear = calculate_ear(right)
            ear = (left_ear + right_ear) / 2.0
            print("ear: ", ear)
            threshold = (eye_data['open_eye_left'] + eye_data['open_eye_right']) / 2.0 * 0.2 + \
                        (eye_data['close_eye_left'] + eye_data['close_eye_right']) / 2.0 * 0.8
            print(f"eye_data: {eye_data}, threshold: {threshold}")
            if ear < threshold:
                state = 3
            else:
                labels = response_label.json()['responses'][0]['labelAnnotations']
                # iselectric=False
                for label in labels:
                    if label['description'] == 'Smartphone' or \
                            label['description'] == 'Mobile phone':
                        state = 2
                        break
                    if label['description'] == 'Electronic device':
                        state = 2
                        break
                    # what about television?
    current_study = DailyStudyForSubject.objects.get(user__id=request.user.id, is_active=True)
    new_concentration = Concentration(concentration=(state == 0), parent_study=current_study)
    new_concentration.save()
    if state == 0:
        current_study.study_time += datetime.timedelta(seconds=10)
        current_study.concentration_gauge = current_study.study_time / (
                current_study.study_time + current_study.distracted_time)
    else:
        current_study.distracted_time += datetime.timedelta(seconds=10)
        current_study.concentration_gauge = current_study.study_time / (
                current_study.study_time + current_study.distracted_time)
    current_study.save()
    inference_happen.send(sender='study_infer', studying_info={
        'user__id': request.user.id,
        'gauge': current_study.concentration_gauge,
    }, simage=simage, group_id=group_id)

    return JsonResponse({'status': state,
                         'gauge': current_study.concentration_gauge},
                        status=201, safe=False)
