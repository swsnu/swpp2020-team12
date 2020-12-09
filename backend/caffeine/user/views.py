from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
import json
from .models import User
from django.contrib.auth import authenticate, login, logout

@ensure_csrf_cookie
@csrf_exempt
def sign_up(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        name = req_data['name']
        message = req_data['message']
        user = User.objects.create_user(username=username,
                                        password=password, name=name, message=message)
        user.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

@ensure_csrf_cookie
@csrf_exempt
def sign_in(request):
    if request.method == "POST":
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


def sign_out(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_user(request):
    if request.method == 'GET':
        is_logged_in = request.user.is_authenticated
        response_dict = {'isLoggedIn': is_logged_in}
        if is_logged_in:
            response_dict['name'] = request.user.name
            response_dict['message'] = request.user.message
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
