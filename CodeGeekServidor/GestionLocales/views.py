from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from GestionLocales.models import *

# Create your views here.
@csrf_exempt
def get_escuelas (request):
    escuelas =list(Escuela.objects.values())
    lista =[]
    for i in range(len(escuelas)):
        diccionario={
            "code":"",
            "label":""
        }
        diccionario["code"]= escuelas[i]["cod_escuela"]
        diccionario["label"]=escuelas[i]["nombre_escuela"]
        lista.append(diccionario);
        del diccionario
    return JsonResponse(lista, safe=False)

