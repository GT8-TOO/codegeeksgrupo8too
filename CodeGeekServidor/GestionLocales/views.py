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
            "calificacion":0,
            "urlImg":""
        }
        diccionario["id"]= i
        diccionario["code"]= locales[i]["cod_local"]
        diccionario["label"]= locales[i]["nombre_local"]
        diccionario["descripcion"]= locales[i]["descripcion"]
        diccionario["codEdificio"]= locales[i]["cod_edificio_id"]
        diccionario["urlImg"]= locales[i]["url_img"]
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
        #Datos del local
        codLocal= request.POST.get('codigoLocal')
        nombreLocal = request.POST.get('nombreLocal')
        codEdificio= request.POST.get('codEdificio')
        nivelLocal = request.POST.get('nivel')
        altitudLocal = request.POST.get('altitud')
        calificacionL = request.POST.get('calificacion')
        longuitud = int(request.POST.get('cantidadImagenes') )
        descripcionLocal= request.POST.get('descripcionLocal')
        imagen=[]

        #Trae las n imagenes del local
        for i in range(longuitud):
            nombre= 'imagenes'+str(i)
            imagen.append(request.FILES.get(nombre))

        edificio = list(Edificio.objects.filter(cod_edificio= codEdificio).values())
        if not edificio :
            respuesta["title"]="Eror al traer el edificio"
            respuesta["state"]=True
            respuesta["message"]="El nombre del edificio no existe o lo escribio mal"
            respuesta["type"]="error"
            return JsonResponse(respuesta, safe=False)
 
        #Crea el nuevo local
        nuevo_local = Local.objects.create(
            cod_local = codLocal,
            nombre_local= nombreLocal,
            descripcion=descripcionLocal,
            nivel = nivelLocal,
            altitud= altitudLocal,
            puntuacion= int(calificacionL),
            cod_edificio_id= edificio[0]["cod_edificio"],
            imagen_local= imagen[0]
        )
        ruta1=str(nuevo_local.imagen_local)
        nuevo_local.url_img = ruta1.replace('templates/build/static/media/', 'http://localhost:8000/static/media/')

        try:
            nuevo_local.save()
            respuesta["title"]="Completado"
            respuesta["state"]=True
            respuesta["message"]="Se ha registrado con exito el nuevo local"
            respuesta["type"]="success"
        except:
            respuesta["title"]="Eror al guardarlo"
            respuesta["state"]=True
            respuesta["message"]="No se ha podido guardar el nuevo local, intentelo nuevamente y revise la informacion"
            respuesta["type"]="error"
 
        #Guarda todas las imagenes
        try:
            for i in imagen:
                img=Imagen.objects.create(
                    titulo="Imagen del local"+nombreLocal,
                    descripcion="Imagen del local "+codLocal,
                    cod_local_id=codLocal,
                    imagen=i
                )
                ruta=str(img.imagen)
                ruta=ruta.replace('templates/build/static/media/', 'http://localhost:8000/static/media/')
                img.url = ruta
                img.save()
        except:
            respuesta["title"]="Eror al guardar las imagenes"
            respuesta["state"]=True
            respuesta["message"]="No se ha podido guardar las imagenes que seran asignadas al local, reviselo e intentlo nuevamente"
            respuesta["type"]="error"

    return JsonResponse(respuesta, safe=False)
