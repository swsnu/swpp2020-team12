import json
import datetime
import time
import requests
from json import JSONDecodeError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import DailyStudyRecord, DailyStudyForSubject, Concentration
from user.models import User
import math

rot=['top', 'right', 'bottom', 'left']
xyz=['x', 'y', 'z']
def calculate_ear(eye):
    vertcal_sum=0
    horigental_sum=0
    for index in xyz:
        vertcal_sum+=(eye['top'][index]-eye['bottom'][index])**2
        horigental_sum+=(eye['left'][index]-eye['right'][index])**2
    vertic=math.sqrt(vertcal_sum)
    horigental=math.sqrt(horigental_sum)
    return vertic/horigental


# Create your views here.
@csrf_exempt
def study_room(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        #group_id = req_data['group_id']
        user = User.objects.get(id=request.user.id)
        today_study = user.daily_record.filter(date=datetime.date.today())
        if not today_study:
            today_study = DailyStudyRecord(user=user)
            today_study.save()
        if DailyStudyForSubject.objects.filter(user__id=request.user.id, is_active=True) :
            current_study=DailyStudyForSubject.objects.get(user__id=request.user.id, is_active=True)
            today_study = user.daily_record.filter(date=datetime.date.today()).first()
            today_study.total_study_time += current_study.study_time
            today_study.total_study_time += current_study.distracted_time
            today_study.total_concentration += current_study.study_time
            if today_study.total_study_time != datetime.timedelta(0):
                today_study.total_gauge = today_study.total_concentration / today_study.total_study_time
            current_study.is_active = False
            current_study.save()
            today_study.save()
        subject = req_data['subject']
        current_study = DailyStudyForSubject(subject=subject, is_active=True, user=user)
        current_study.save()
        return HttpResponse(status=201)
    elif request.method == 'PUT':
        user = User.objects.get(id=request.user.id)
        current_study = DailyStudyForSubject.objects.get(user__id=request.user.id, is_active=True)
        today_study = user.daily_record.filter(date=datetime.date.today()).first()
        today_study.total_study_time += current_study.study_time
        today_study.total_study_time += current_study.distracted_time
        today_study.total_concentration += current_study.study_time
        if today_study.total_study_time != datetime.timedelta(0):
            today_study.total_gauge = today_study.total_concentration / today_study.total_study_time
        current_study.is_active = False
        current_study.save()
        today_study.save()
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'DELETE'])


@csrf_exempt
def study_infer(request):
    state=0
    req_data = json.loads(request.body.decode())
    img = req_data['image']
    api_url='https://vision.googleapis.com/v1/images:annotate?key='
    key='AIzaSyC4Q4MCBS78pxzDk0dJCM6uAGoKMs866RM'
    api_url+=key
    image = img.split(',')[1]
    _features=[{
          "type":"FACE_DETECTION",
          "maxResults":1
        }
    ]
    _features_label=[{
          "type":"LABEL_DETECTION",
          "maxResults":10
        },
    ]
    _image={
        'content': image
    }
    data={
        "requests":[{
            'image': _image,
            'features': [_features]
        }
        ]
    }
    start = time.time()
    response=requests.post(api_url, json=data)
    data['requests'][0]['features']=[_features_label]
    response_label=requests.post(api_url, json=data)
    print("time :", time.time() - start)
    #print(response_label.json()['responses'])
    response=response.json()
    if response['responses'][0]=={}:
        state=1
    else:
        face=response['responses'][0]['faceAnnotations'][0]
        landmarks=face['landmarks']
        pan=face['panAngle']
        tilt=face['tiltAngle']
        print(pan, tilt)
        if abs(pan)>30 or tilt<-20 or tilt>20:
            state=2
        else:
            left={}
            right={}
            for i in range(4):
                left[rot[i]]=landmarks[16+i]['position']
                right[rot[i]]=landmarks[20+i]['position']
            left_ear=calculate_ear(left)
            right_ear=calculate_ear(right)
            ear=(left_ear+right_ear)/2.0
            print(ear)
            if ear<0.4:
                state=3           
            else:
                labels=response_label.json()['responses'][0]['labelAnnotations']
                #iselectric=False
                for label in labels:
                    if label['description']=='Smartphone' or label['description']=='Mobile phone':
                        state=2
                        break
                    if label['description']=='Electronic device':
                        state=2
                        break
                    # what about television? 
    current_study = DailyStudyForSubject.objects.get(user__id=request.user.id, is_active=True)
    new_concentration = Concentration(concentration=(state==0), parent_study=current_study)
    new_concentration.save()
    if state==0:
        current_study.study_time += datetime.timedelta(seconds=10)
        current_study.concentration_gauge = current_study.study_time / (
                    current_study.study_time + current_study.distracted_time)
    else:
        current_study.distracted_time += datetime.timedelta(seconds=10)
        current_study.concentration_gauge = current_study.study_time / (
                    current_study.study_time + current_study.distracted_time)
    current_study.save()
    return JsonResponse({'status': state,
        'gauge': current_study.concentration_gauge},
        status=201, safe=False)
