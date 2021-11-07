from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.db.models import Avg 
from GestionLocales.models import *
from GestionUsuarios.models import Docente

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
def get_imagenes_local (request):
    if request.method =="POST":
        cod_local = request.POST.get("codLocal")
        imagen = list(Imagen.objects.filter(cod_local_id=cod_local).values())
        return JsonResponse(imagen,safe=False)
    else:
        return JsonResponse({"Error":"No se puede acceder a esta ruta"}, safe=False)

@csrf_exempt
def registrar_local (request):
    #Metodo que registrara un local para poder mostrarlo
    respuesta ={
        "title":"",
        "state":True,
        "creado":False,
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
        nuevo_local.url_img = ruta1.replace('templates/build/static/media/', 'http://127.0.0.1:8000/static/media/')

        try:
            nuevo_local.save()
            respuesta["title"]="Completado"
            respuesta["state"]=True
            respuesta["creado"]=True
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
                ruta=ruta.replace('templates/build/static/media/', 'http://127.0.0.1:8000/static/static/media/')
                img.url = ruta
                img.save()
        except:
            respuesta["title"]="Eror al guardar las imagenes"
            respuesta["state"]=True
            respuesta["message"]="No se ha podido guardar las imagenes que seran asignadas al local, reviselo e intentlo nuevamente"
            respuesta["type"]="error"

    return JsonResponse(respuesta, safe=False)

@csrf_exempt
def nueva_calificacion(request):
    respuesta ={
        "title":"Error al actualizar la puntuación",
        "state":True,
        "creado":False,
        "message":"",
        "type":""
    }
    if request.method == "POST":
        #Datos recibidos 
        calificacion = int(request.POST.get('nuevaValoracion'))
        local = request.POST.get('codLocal')
        usuario = request.POST.get('codEmpleado') #dui
        
        if calificacion > 0 and calificacion < 6:
            local= Local.objects.get(cod_local=local)
            usuario=Docente.objects.get(dui=usuario)

            #almacenar ountuación
            try:
                puntuacion=Puntuacion.objects.get(cod_local=local, dui=usuario)
                puntuacion.puntuacion=calificacion
                puntuacion.save()
            except:
                Puntuacion.objects.create(cod_local=local, dui=usuario, puntuacion = calificacion)
            
            #Calcular promedio nuevo
            calificaciones= Puntuacion.objects.filter(cod_local= local).values('puntuacion')
            suma=0
            cantidad=0
            for puntuacion in calificaciones:
                suma=suma+puntuacion['puntuacion']
                cantidad=cantidad+1
            promedio=round(suma/cantidad)
            
            #actualizar promedio
            local.puntuacion=promedio
            local.save()
            respuesta["title"]="Nueva puntuación."
            respuesta["type"]="success"
            respuesta["creado"]=True
            respuesta["message"]="La puntuación del local ha sido actualizada."
        else:
            respuesta["type"]="error"
            respuesta["message"]="La puntuació enviada es invalida."       
    return JsonResponse(respuesta, safe=False)
    pass

