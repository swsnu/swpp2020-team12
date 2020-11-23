import json
import datetime
from json import JSONDecodeError
from django.shortcuts import render
from operator import itemgetter
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum, Q
from django.db.models.functions import Coalesce
from study.models import DailyStudyRecord, DailyStudyForSubject, Concentration
from user.models import User
from group.models import Group


@csrf_exempt
def user_rank(request):
    """10명만, 유저 정보는 따로 보"""
    if request.method == 'GET':
        """전체 user 의 rank를 돌려줌"""
        # records = DailyStudyRecord.objects.filter(date=datetime.date.today())
        records = User.objects.annotate(
            today_time=Coalesce(Sum('daily_record__total_concentration',
                                    filter=Q(daily_record__date=datetime.date.today())), 0)) \
            .order_by('-today_time')
        records_sorted = [{'id': record.id, 'name': record.name,
                           'time': record.today_time} for record in records]
        #   records_sorted = sorted(records, key=itemgetter('time'), reverse=True)
        user_record = next((item for item in records_sorted if item["id"] == request.user.id), None)
        user_ranking = next((i for i, item in enumerate(records_sorted, 1) if item["id"] == request.user.id), None)
        # if user_record is None:
        #    user_record = {'name': request.user.name, 'time': datetime.timedelta()}
        #    user_ranking = User.objects.count()
        for record in records_sorted:
            record.pop('id')
        # if len(records) > 10:
        #    records_sorted = records_sorted[:10]
        response_dict = {'records': records_sorted, 'user_ranking': user_ranking, 'user_record': user_record}
        return JsonResponse(response_dict, safe=False)

    elif request.method == 'POST':
        """한달 rank 말고 전체 rank -> too much time..?"""
        records = User.objects.annotate(total_time=Coalesce(Sum('daily_record__total_concentration'), 0)) \
            .order_by('-total_time')
        records_sorted = [{'id': record.id, 'name': record.name,
                           'time': record.total_time} for record in records]
        # records_sorted = sorted(records, key=itemgetter('time'), reverse=True)
        user_record = next((item for item in records_sorted if item["id"] == request.user.id), None)
        user_ranking = next((i for i, item in enumerate(records_sorted, 1) if item["id"] == request.user.id), None)
        # if user_record is None:
        #    user_record = {'name': request.user.name, 'time': datetime.timedelta()}
        #    user_ranking = User.objects.count()
        for record in records_sorted:
            record.pop('id')
        response_dict = {'records': records_sorted, 'user_ranking': user_ranking, 'user_record': user_record}
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


@csrf_exempt
def group_rank(request, group_id):
    """should constrain group member's max length"""
    if group_id == -1:
        return HttpResponse(status=400)

    elif request.method == 'GET':
        group_members = Group.objects.get(id=group_id).members
        records = User.objects.annotate(
            today_time=Coalesce(Sum('daily_record__total_concentration',
                                    filter=Q(daily_record__date=datetime.date.today())), 0)) \
            .order_by('-today_time')
        records = records.filter(username__in=group_members.iterator())
        records_sorted = [{'id': record.id, 'name': record.name,
                           'time': record.today_time} for record in records]
        user_record = next((item for item in records_sorted if item["id"] == request.user.id), None)
        user_ranking = next((i for i, item in enumerate(records_sorted, 1) if item["id"] == request.user.id), None)
        # if user_record is None:
        #    user_record = {'name': request.user.name, 'time': datetime.timedelta()}
        #    user_ranking = User.objects.count()
        for record in records_sorted:
            record.pop('id')
        response_dict = {'records': records_sorted, 'user_ranking': user_ranking, 'user_record': user_record}
        return JsonResponse(response_dict, safe=False)

    elif request.method == 'POST':
        group_members = Group.objects.get(id=group_id).members
        records = User.objects.annotate(total_time=Coalesce(Sum('daily_record__total_concentration'), 0)) \
            .order_by('-total_time')
        records = records.filter(username__in=group_members.iterator())
        records_sorted = [{'id': record.id, 'name': record.name,
                           'time': record.total_time} for record in records]
        user_record = next((item for item in records_sorted if item["id"] == request.user.id), None)
        user_ranking = next((i for i, item in enumerate(records_sorted, 1) if item["id"] == request.user.id), None)
        # if user_record is None:
        #    user_record = {'name': request.user.name, 'time': datetime.timedelta()}
        #    user_ranking = User.objects.count()
        for record in records_sorted:
            record.pop('id')
        response_dict = {'records': records_sorted, 'user_ranking': user_ranking, 'user_record': user_record}
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
