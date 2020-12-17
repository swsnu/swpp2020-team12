import json
import math
from datetime import datetime, timedelta
from json import JSONDecodeError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from user.models import User
from study.models import DailyStudyForSubject, DailyStudyRecord, Concentration


def formatHHmm(duration):
    sec = duration.total_seconds()
    return '%02d:%02d' % (int((sec / 3600) % 3600), int((sec / 60) % 60))

def getMonthlydata(request, year, month):
    if request.method == 'GET':
        dailyRecord = request.user.daily_record
        response_list = [
            {'date': dailyRecord.date,
             'count':
                 math.ceil((
                               dailyRecord.total_concentration).total_seconds() /
                           dailyRecord.total_study_time.total_seconds() * 4)
             }
            for dailyRecord in dailyRecord.iterator() if
            (str(dailyRecord.date.year) + str(dailyRecord.date.month)) ==
            (str(year) + str(month + 1))
        ]
        return JsonResponse(response_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def getWeeklydata(request, year, month, date):
    if request.method == 'GET':
        dailySubjectRecord = request.user.daily_subject_record
        data_list = [
            {'date': dailySubjectRecord.date,
             'subject': dailySubjectRecord.subject,
             'study_time': dailySubjectRecord.study_time,
             'distracted_time': dailySubjectRecord.distracted_time
             }
            for dailySubjectRecord in dailySubjectRecord.iterator() if
            dailySubjectRecord.date.year == year and
            dailySubjectRecord.date.month == month + 1 and
            6 >= (date - dailySubjectRecord.date.day) >= 0]
        total = timedelta(0)
        study_time = timedelta(0)
        result_list = []
        subject_list = list(set([dic['subject'] for dic in data_list]))
        for subject in subject_list:
            subject_study_time = timedelta(0)
            for dic in data_list:
                if dic['subject'] == subject:
                    subject_study_time += dic['study_time']
                    study_time += dic['study_time']
                    total += dic['study_time']
                    total += dic['distracted_time']
            result_list.append({'x': subject, 'y': subject_study_time.total_seconds()})

        response = {'weekly_total': formatHHmm(total), 'weekly_study_time': formatHHmm(study_time),
                    'weekly_subjectData': result_list}
        return JsonResponse(response, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def getDailySubject(request, year, month, date):
    if request.method == 'GET':
        dailySubjectRecord = request.user.daily_subject_record
        data_list = [
            {'date': dailySubjectRecord.date,
             'subject': dailySubjectRecord.subject,
             'start_time': dailySubjectRecord.start_time,
             'end_time': dailySubjectRecord.end_time,
             'study_time': dailySubjectRecord.study_time,
             'distracted_time': dailySubjectRecord.distracted_time
             }
            for dailySubjectRecord in dailySubjectRecord.iterator() if
            dailySubjectRecord.date.year == year and
            dailySubjectRecord.date.month == month + 1 and
            dailySubjectRecord.date.day == date]
        total = timedelta(0)
        study_time = timedelta(0)
        result_list = []
        subject_list = list(set([dic['subject'] for dic in data_list]))
        for subject in subject_list:
            subject_study_time = timedelta(0)
            for dic in data_list:
                if dic['subject'] == subject:
                    subject_study_time += dic['study_time']
                    study_time += dic['study_time']
                    total += dic['study_time']
                    total += dic['distracted_time']
            result_list.append({'x': subject, 'y': subject_study_time.total_seconds()})
        timelineData_list = [
            {
                'title': record['subject'],
                'cardSubtitle': record['start_time'].strftime('%H:%M:%S') +
                                '~' + record['end_time'].strftime('%H:%M:%S')
            }
            for record in data_list
        ]

        response = {'daily_total': formatHHmm(total), 'daily_study_time': formatHHmm(study_time),
                    'subjectData': result_list, 'timelineData': timelineData_list}

        return JsonResponse(response, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
