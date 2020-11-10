import json
from json import JSONDecodeError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Group


# from .serializers import GroupSerializer


# Create your views here.

@csrf_exempt
def user_group_list(request):
    """user가 속한 그룹"""
    if request.method == 'GET':
        user_groups = [group for group in Group.objects.filter(members__id=request.user.id).values()]
        for group in user_groups:
            del group['password']
        return JsonResponse(user_groups, safe=False)
    if request.method == 'POST':
        try:
            body = request.body.decode()
            name = json.loads(body)['name']
            password = json.loads(body)['password']
            description = json.loads(body)['description']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        group = Group(name=name, password=password, description=description)
        group.members.add(request.user)
        group.save()
        response_dict = {'id': group.id, 'name': group.name,
                         'time': group.time, 'description': group.description,
                         'members': [request.user.id]}
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


@csrf_exempt
def user_group_info(request, group_id):
    """유저의 자기 그룹을 클릭했을 때"""
    # if group member에 request.user가 없다면 403
    if request.method == 'GET':
        group = Group.objects.filter(id=group_id).first()
        count = group.members.count()
        member_list = [{'id': member.id, 'name': member.name, 'message': member.message}
                       for member in group.members.iterator()]
        response_dict = {'id': group.id, 'name': group.name, 'count': count,
                         'time': group.time, 'description': group.description,
                         'members': member_list
                         }
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponseNotAllowed(['GET', 'DELETE'])


@csrf_exempt
def group_search(request, group_name):
    """검색한 그룹"""
    if request.method == 'GET':
        groups = Group.objects.filter(name__contains=group_name)
        response_dict = [{'id': group.id, 'name': group.name, 'count': group.members.count(),
                         'time': group.time, 'description': group.description}
                         for group in groups.iterator()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def search_group_info(request, group_id):
    """검색 -> 그룹 클릭.
    members 정보를 보내지 않음"""
    if request.method == 'GET':
        group = Group.objects.filter(id=group_id).first()
        count = group.members.count()
        response_dict = {'id': group.id, 'name': group.name, 'count': count,
                         'time': group.time, 'description': group.description
                         }
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])