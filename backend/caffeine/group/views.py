import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Group


# Create your views here.

def user_group_list(request):
    """user가 속한 그룹"""
    if request.method == 'GET':
        groups = [group for group in Group.objects.filter(members__id=request.user.id)]
        response_dict = list()
        for group in groups:
            member_list = [{'id': member.id, 'name': member.name, 'message': member.message}
                           for member in group.members.iterator()]
            response_dict.append({'id': group.id, 'name': group.name, 'time': group.time,
                                  'description': group.description, 'members': member_list})
        return JsonResponse(response_dict, safe=False)
    elif request.method == 'POST':
        try:
            body = request.body.decode()
            name = json.loads(body)['name']
            password = json.loads(body)['password']
            description = json.loads(body)['description']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
        group = Group(name=name, password=password, description=description)
        group.save()
        group.members.add(request.user)
        member_list = [{'id': member.id, 'name': member.name, 'message': member.message}
                       for member in group.members.iterator()]
        response_dict = {'id': group.id, 'name': group.name,
                         'time': group.time, 'description': group.description,
                         'members': member_list}
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


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
    elif request.method == 'DELETE':
        group = Group.objects.get(id=group_id)
        group.members.remove(group.members.filter(id=request.user.id).first())
        if Group.objects.get(id=group_id).members.count() == 0:
            group.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'DELETE'])


def search_group_info(request, group_id):
    """검색 -> 그룹 클릭.
    members 정보를 보내지 않음"""
    if request.method == 'GET':
        group_id = int(group_id)
        group = Group.objects.filter(id=group_id).first()
        if group.members.filter(id=request.user.id).exists():  # user already joined the group
            return HttpResponse(status=400)
        count = group.members.count()
        response_dict = {'id': group.id, 'name': group.name, 'count': count, 'time': group.time,
                         'description': group.description, 'password': group.password}
        return JsonResponse(response_dict, safe=False)
    elif request.method == 'POST':  # group_id is string
        groups = Group.objects.filter(name__contains=group_id)
        response_dict = [{'id': group.id, 'name': group.name, 'count': group.members.count(),
                          'time': group.time, 'description': group.description,
                          'password': group.password} for group in groups.iterator()]
        return JsonResponse(response_dict, safe=False)
    elif request.method == 'PUT':
        group_id = int(group_id)
        try:
            body = request.body.decode()
            password = json.loads(body)['password']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
        group = Group.objects.filter(id=group_id).first()
        if password == group.password:
            group.members.add(request.user)
            count = group.members.count()
            member_list = [{'id': member.id, 'name': member.name, 'message': member.message}
                           for member in group.members.iterator()]
            response_dict = {'id': group.id, 'name': group.name, 'count': count,
                             'time': group.time, 'description': group.description,
                             'members': member_list
                             }
            return JsonResponse(response_dict, status=201, safe=False)
        else:
            return HttpResponse(status=403)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])
