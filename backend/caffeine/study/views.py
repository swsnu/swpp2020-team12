import json
import datetime
from json import JSONDecodeError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import DailyStudyRecord, DailyStudyForSubject, Concentration
from user.models import User
import random


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
        today_study.total_gauge = today_study.total_concentration / today_study.total_study_time
        current_study.is_active = False
        current_study.save()
        today_study.save()
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'DELETE'])


@csrf_exempt
def study_infer(request):
    req_data = json.loads(request.body.decode())
    img = req_data['image']
    current_study = DailyStudyForSubject.objects.get(user__id=request.user.id, is_active=True)
    new_concentration = Concentration(concentration=True, image=img, parent_study=current_study)
    new_concentration.save()
    current_study.study_time += datetime.timedelta(seconds=10)
    current_study.concentration_gauge = current_study.study_time / (
                current_study.study_time + current_study.distracted_time)
    current_study.save()
    return JsonResponse({'status': 0,
        'gauge': current_study.concentration_gauge},
        status=201, safe=False)

#    else:
#        current_study.distracted_time += datetime.timedelta(seconds=10)
#        current_study.concentration_gauge = current_study.study_time / (
#                    current_study.study_time + current_study.distracted_time)
