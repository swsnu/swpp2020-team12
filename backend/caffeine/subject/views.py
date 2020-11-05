from json import JSONDecodeError
from django.shortcuts import render
import json
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Subject


# Create your views here.


@csrf_exempt
def subject_list(request):
    """user가 속한 그룹"""
    if request.method == 'GET':
        subjects = [subject for subject in Subject.objects.filter(user=request.user).values()]
        return JsonResponse(subjects, safe=False) #TODO: user id 줘야하나?
    if request.method == 'POST':
        try:
            body = request.body.decode()
            name = json.loads(body)['name']
            time = json.loads(body)['time']
            description = json.loads(body)['description']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        subject = Subject(name=name, time=time, description=description, user=request.user)
        subject.save()
        response_dict = {'id': subject.id, 'name': subject.name,
                         'time': subject.time, 'description': subject.description,
                         'user': request.user.id} #TODO: user id 줘야하나?
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


@csrf_exempt
def subject_info(request, subject_id):
    """유저의 자기 그룹을 클릭했을 때"""
    # if subject member에 request.user가 없다면 403
    if request.method == 'GET':
        subject = Subject.objects.filter(id=subject_id).first()
        return JsonResponse(subject, safe=False)
    if request.method == 'POST':
        try:
            body = request.body.decode()
            name = json.loads(body)['name']
            time = json.loads(body)['time']
            description = json.loads(body)['description']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        subject = Subject.objects.get(id=subject_id)
        subject.name = name
        subject.time = time
        subject.description = description
        subject.save()
        response_dict = {'id': subject.id, 'name': subject.name,
                         'time': subject.time, 'description': subject.description,
                         'user': request.user.id}
        return JsonResponse(response_dict, status=201)
    if request.method=='DELETE':
        Subject.objects.filter(id=subject_id).delete()
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
