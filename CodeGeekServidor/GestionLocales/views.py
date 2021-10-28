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
    edificio= list(Edificio.objects.values())
    lista =[]
    for i in range(len(locales)):
        diccionario={
            "id":0,
            "code":"",
            "label":"",
            "descripcion":"",
            "codEdificio":"",
            "nombreEdificio":"",
            "calificacion":0
        }
        diccionario["id"]= i
        diccionario["code"]= locales[i]["cod_local"]
        diccionario["label"]= locales[i]["nombre_local"]
        diccionario["descripcion"]= locales[i]["descripcion"]
        diccionario["codEdificio"]= locales[i]["cod_edificio_id"]
        for j in range(len(edificio)):
            if edificio[j]["cod_edificio"]== locales[i]["cod_edificio_id"]:
                diccionario["nombreEdificio"]= edificio[j]["nombre_edificio"]
        diccionario["calificacion"]= locales[i]["puntuacion"]
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
        img =request.FILES.get('imagenes')
        cover= request.FILES.get('imagenes2')
        print(cover)
        img=Imagen.objects.create(imagen=img)
        ruta=str(img.imagen)
        ruta=ruta.replace('templates/build/static/img/', 'http://localhost:8000/static/img/')
        img.url = ruta
        img.save()
        print(ruta)
    return JsonResponse(respuesta, safe=False)
