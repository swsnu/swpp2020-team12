import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Subject, Days
import isodate


# Create your views here.


@csrf_exempt
def subject_list(request):
    """user가 속한 그룹"""
    if request.method == 'GET':
        subjects = [subject for subject in Subject.objects.filter(user=request.user)]
        response_dict = list()
        for subject in subjects:
            day_list = [{'day': day.day, 'start_time': day.start_time,
                         'duration': day.duration} for day in subject.days.iterator()]
            response_dict.append({'id': subject.id, 'name': subject.name, 'user': subject.user.id,
                                  'description': subject.description, 'days': day_list})
        return JsonResponse(response_dict, safe=False)
    if request.method == 'POST':
        try:
            body = request.body.decode()
            name = json.loads(body)['name']
            description = json.loads(body)['description']
            days = json.loads(body)['days']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        subject = Subject(name=name, description=description, user=request.user)
        subject.save()
        for day in days:
            new_day = Days(day=day['day'], start_time=day['start_time'],
                           duration=isodate.parse_duration(day['duration']))  # timedelta가 안들어감 ㅠ
            new_day.save()
            subject.days.add(new_day)
        response_dict = {'id': subject.id, 'name': subject.name,
                         'description': subject.description, 'user': subject.user.id}  # TODO: 지금 days 빼고 돌려줌
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


@csrf_exempt
def subject_info(request, subject_id):
    """유저의 자기 그룹을 클릭했을 때"""
    # if subject member에 request.user가 없다면 403
    if request.method == 'GET':
        subject = Subject.objects.filter(id=subject_id).first()
        day_list = [{'day': day.day, 'start_time': day.start_time,
                     'duration': day.duration} for day in subject.days.iterator()]
        response_dict = {'id': subject.id, 'name': subject.name, 'user': subject.user.id,
                         'description': subject.description, 'days': day_list}
        return JsonResponse(response_dict, safe=False)

    if request.method == 'PUT':
        try:
            body = request.body.decode()
            name = json.loads(body)['name']
            description = json.loads(body)['description']
            days = json.loads(body)['days']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        subject = Subject.objects.get(id=subject_id)
        subject.name = name
        # subject.days
        subject.description = description
        subject.save()
        response_dict = {'id': subject.id, 'name': subject.name,
                         'description': subject.description,
                         'user': request.user.id}
        return JsonResponse(response_dict, status=201)
    if request.method == 'DELETE':
        Subject.objects.filter(id=subject_id).delete()
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
