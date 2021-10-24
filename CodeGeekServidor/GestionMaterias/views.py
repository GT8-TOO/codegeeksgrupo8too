from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from GestionMaterias.models import *;

# Create your views here
@csrf_exempt
def registrar_materia (request):
    respuesta ={
        "type":"",
        "materiaGuardada":False,
        "message":""
    }
    if request.method =="POST":
        codigoMateria = request.POST.get("codigoMateria")
        nombreMateria = request.POST.get("nombreMateria")
        unidadesValorativas = request.POST.get("unidadesValorativas")
        obligatoriaM = request.POST.get("materiaObligatoria")

        if obligatoriaM =="si":
            obligatoriaM=1
        elif obligatoriaM=="no":
            obligatoriaM=0

        materia = Materia(
            cod_materia=codigoMateria, 
            nombre_materia=nombreMateria,
            unidades_valorativas=unidadesValorativas,
            obligatoria=obligatoriaM
        )
        try:
            verificacion = Materia.objects.get(cod_materia=codigoMateria);
            respuesta["type"]="error"
            respuesta["materiaGuardada"]=True
            respuesta["message"]="La materia no se ha podido guardar, puede ser que ya exista esa materia"
            del verificacion
        except:
            materia.save()
            respuesta["type"]="success"
            respuesta["message"]="La materia se ha guardado correctamente"
            respuesta["materiaGuardada"]=True

    return JsonResponse(respuesta, safe=False)


@csrf_exempt
def mandar_materias (request):
    materias = list(Materia.objects.values())
    lista =[]
    for i in range(len(materias)):
        diccionario={
            "id":0,
            "code":"",
            "label":""
        }
        diccionario["id"]=i
        diccionario["code"]=materias[i]["cod_materia"]
        diccionario["label"]=materias[i]["nombre_materia"]
        lista.append(diccionario)
    return JsonResponse(lista, safe=False)
