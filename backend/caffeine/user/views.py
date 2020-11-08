from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse 
import json
from .models import User
from django.contrib.auth import authenticate, login, logout


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        name = req_data['name']
        message = req_data['message']
        user = User.objects.create_user(username=username, password=password, name=name, message=message)
        user.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])
        
@csrf_exempt
def signin(request):
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
