from json import JSONDecodeError
from django.shortcuts import render
import json
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
        group.save()
        group.members.add(request.user)
        response_dict = {'id': group.id, 'name': group.name,
                         'time': group.time, 'description': group.description}
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
    """user가 속한 그룹"""
    return HttpResponse(status=404)


@csrf_exempt
def search_group_info(request, group_id):
    """검색 -> 그룹 클릭.
    members 정보를 보내지 않음"""
    return HttpResponse(status=404)


"""

def comment_list(request, article_id):
    if request.method == 'GET':
        if not request.user.is_authenticated: return HttpResponse(status=401)
        comment_all_list = [comment for comment in Comment.objects.filter(article=article_id).values()]
        #     if comment_all_list is None: return HttpResponse("no comment", status=404)
        for comment in comment_all_list:
            comment['author'] = comment['author_id']
            del comment['author_id']
            comment['article'] = comment['article_id']
            del comment['article_id']
        return JsonResponse(comment_all_list, safe=False)  # serailization
    elif request.method == 'POST':
        if not request.user.is_authenticated: return HttpResponse(status=401)
        try:
            body = request.body.decode()
            comment_content = json.loads(body)['content']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        selected_article = Article.objects.filter(id=article_id).first()
        comment = Comment(article=selected_article, content=comment_content, author=request.user)
        comment.save()
        response_dict = {'id': comment.id, 'content': comment.content, 'author': comment.author.id}
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'DELETE'])


def comment_info(request, comment_id):
    if request.method == 'GET':
        if not request.user.is_authenticated: return HttpResponse(status=401)
        comment_all_list = [comment for comment in Comment.objects.filter(id=comment_id).values()]
        if len(comment_all_list) == 0: return HttpResponse("no comment", status=404)
        for comment in comment_all_list:
            comment['author'] = comment['author_id']
            del comment['author_id']
            comment['article'] = comment['article_id']
            del comment['article_id']
        return JsonResponse(comment_all_list[0], safe=False)  # serailization
    elif request.method == 'PUT':
        if not request.user.is_authenticated: return HttpResponse(status=401)
        try:
            body = request.body.decode()
            comment_content = json.loads(body)['content']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        selected_comment = Comment.objects.filter(id=comment_id).first()
        if selected_comment is None: return HttpResponse("no comment", status=404)
        if request.user.id != selected_comment.author.id: return HttpResponse(status=403)
        selected_comment.content = comment_content
        selected_comment.save()
        response_dict = {'id': selected_comment.id, 'article': selected_comment.article.id,
                         'content': selected_comment.content, 'author': selected_comment.author.id}
        return JsonResponse(response_dict, status=201)
    elif request.method == 'DELETE':
        if not request.user.is_authenticated: return HttpResponse(status=401)
        selected_comment = Article.objects.filter(id=comment_id).first()
        if selected_comment is None: return HttpResponse("no comment", status=404)
        if request.user.id != selected_comment.author.id: return HttpResponse(status=403)
        selected_comment.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
"""
