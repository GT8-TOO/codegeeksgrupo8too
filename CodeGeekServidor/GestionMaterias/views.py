from django.shortcuts import render
from django.http import JsonResponse
from django.urls.resolvers import LocaleRegexDescriptor
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


# @csrf_exempt
def crear_catedra (request):
    respuesta ={
        "type":"",
        "message":""
    }
    # if request.method =="POST":
    # docentes=[]
    cod_materia = request.GET.get("cod_materia")
    cantidad = int(request.GET.get("cantidad"))
    coordinador_dui = request.GET.get("coordinador_dui")
    anio = request.GET.get("anio")
    ciclo_par = request.GET.get("ciclo_par")
    fecha_inicio=request.GET.get("fecha_inicio")
    fecha_fin=request.GET.get("fecha_fin")
    
    #  recuperando materia
    materia=Materia.objects.get(pk=cod_materia)
    
    # catedra=Catedra(cod_materia=materia,anio=anio,ciclo_par=ciclo_par)
    catedra=Catedra(cod_materia=materia,anio=anio,ciclo_par=ciclo_par,fecha_inicio=fecha_inicio,fecha_fin=fecha_fin)
    catedra.save()
    
    # recuperando coordinador
    coordinador=Docente.objects.get(pk=coordinador_dui)
    
    # agregando al coordinador a la catedra
    add=EsParteDe(cod_catedra=catedra,dui=coordinador,coordinador=True)
    add.save()
    
    # agregando todos los docentes a la catedra
    # recuperando los docentes
    for i in range(1,cantidad):
            nombre=request.GET.get("docente"+str(i))
            print(nombre)
            doc=Docente.objects.get(pk=nombre) 
            add=EsParteDe(cod_catedra=catedra,dui=doc,coordinador=False)
            add.save()
           
    respuesta["type"]="success"
    respuesta["message"]="La Catedra de "+catedra.cod_materia.nombre_materia+" ha sido configurada correctamente."   
    return JsonResponse(respuesta, safe=False)