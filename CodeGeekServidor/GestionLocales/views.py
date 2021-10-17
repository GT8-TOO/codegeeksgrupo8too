from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from GestionLocales.models import *

# Create your views here.
@csrf_exempt
def get_escuelas (request):
    escuelas =list(Escuela.objects.values())
    return JsonResponse(escuelas, safe=False)