from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from GestionLocales.models import *

# Create your views here.

@csrf_exempt
def get_edificios (request):
    #Metodo que envia los edificios mediante json
    edificio=list(Edificio.objects.values())
    lista =[]
    for i in range(len(edificio)):
        diccionario={
            "id":0,
            "code":"",
            "label":"",
            "longuitud":"",
            "latitud":""
        }
        diccionario["id"]= i
        diccionario["code"]= edificio[i]["cod_edificio"]
        diccionario["label"]= edificio[i]["nombre_edificio"]
        diccionario["longitud"]= edificio[i]["longitud"]
        diccionario["latitud"]= edificio[i]["latitud"]
        lista.append(diccionario);
        del diccionario
    return JsonResponse(lista, safe=False)

@csrf_exempt
def get_locales(request):
    #Metodo que mandara todos los locales que se encuentran
    locales = list(Local.objects.values())
    lista =[]
    for i in range(len(locales)):
        diccionario={
            "id":0,
            "code":"",
            "label":"",
            "descripcion":""
        }
        diccionario["id"]= i
        diccionario["code"]= locales[i]["cod_local"]
        diccionario["label"]= locales[i]["nombre_local"]
        diccionario["descripcion"]= locales[i]["descripcion"]
        lista.append(diccionario);
        del diccionario
    return JsonResponse(lista, safe=False)

@csrf_exempt
def get_escuelas(request):
    #Metodo que mandara todos las escuelas que se encuentran
    escuelas = list(Escuela.objects.values())
    lista =[]
    for i in range(len(escuelas)):
        diccionario={
            "id":0,
            "code":"",
            "label":""
        }
        diccionario["id"]= i
        diccionario["code"]= escuelas[i]["cod_escuela"]
        diccionario["label"]=escuelas[i]["nombre_escuela"]
        lista.append(diccionario);
        del diccionario
    return JsonResponse(lista, safe=False)



@csrf_exempt
def registrar_local (request):
    #Metodo que registrara un local para poder mostrarlo
    respuesta ={
        "title":"",
        "state":True,
        "message":"",
        "type":""
    }
    if request.method == "POST":
        print(str(request.POST.get("imagenes")))
    return JsonResponse(respuesta, safe=False)
