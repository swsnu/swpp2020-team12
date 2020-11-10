import json
import datetime
from json import JSONDecodeError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Daily_study_record, Daily_study_for_subject, Concentration
from user.models import User
import random

# Create your views here.
@csrf_exempt
def studyromm(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        group_id=req_data['group_id']
        user=User.objects.get(id=request.user.id)
        today_study=user.dailyrecord.filter(date=datetime.date.today())
        if not today_study:
            today_study=Daily_study_record(user=user)
            today_study.save()
        subject=req_data['subject']
        current_study=Daily_study_for_subject(subject=subject, is_active=True, user=user)
        current_study.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'DELETE'])
    
@csrf_exempt
def study_infer(request):
    pk = random.randint(1, 100)
    status = 0 if pk<70 else 1 if pk<80 else 2 if pk<90 else 3
    req_data = json.loads(request.body.decode())
    img = req_data['image']
    current_study=Daily_study_for_subject.objects.get(user__id=request.user.id, is_active=True)
    newconcentration=Concentration(concentration=(status==0), image=img, parent_study=current_study)
    newconcentration.save()
    if status==0:
        current_study.study_time += datetime.timedelta(seconds=10)
        current_study.concentration_gauge = current_study.study_time /(current_study.study_time + current_study.distracted_time)
    else:
        current_study.distracted_time += datetime.timedelta(seconds=10)
        current_study.concentration_gauge = current_study.study_time / (current_study.study_time + current_study.distracted_time)
    current_study.save()
    return HttpResponse(json.dumps({'status': status, 'gauge': current_study.concentration_gauge}), status=201)

