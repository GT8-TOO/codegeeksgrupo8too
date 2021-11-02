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
#Continuar con el metodo
def registrar_carrera(request):
    respuesta ={
        "state":True,
        "creado":False,
        "type":"",
        "message":""
    }
    if request.method =="POST":
        #Lista materias
        listaMaterias=[]
        cantidad= int(request.POST.get("cantidad"))
        for i in range(cantidad):
            codMateria="codMateria"+str(i)
            codMateriaRequisito="codMateriaRequisito"+str(i)
            cicloMateria="ciclo"+str(i)
            diccionario={
                "codMateria":"",
                "codMateriaRequisito":"",
                "ciclo":""
            }
            diccionario["codMateria"]=request.POST.get(codMateria)
            diccionario["codMateriaRequisito"]=request.POST.get(codMateriaRequisito)
            diccionario["ciclo"]=request.POST.get(cicloMateria)
            listaMaterias.append(diccionario)

        for i in listaMaterias:
            print(i, "\n'")

        #Informacion de la carrera
        carrera = request.POST.get("carrera")
        yearcarrer=request.POST.get("yearcarrer")
        codEscuela=request.POST.get("codEscuela")
        yearPensum = request.POST.get("yearPensum")
        print(carrera, "\n")
        print(yearcarrer, "\n")
        print(codEscuela, "\n")
        print(yearPensum, "\n")

        #Editar el mensaje de confirmacion, pero tiene que tener este formato
        respuesta["type"]="success" #solo adminte warning, info, error, success
        respuesta["state"]=True #Solo adminte True o False
        respuesta["creado"]=True #Solo adminte True o False
        respuesta["message"]="Informacion enviada correctamente" #Aqui ira la inforamcion si se creo o no, es personalizable
        

    else:
        return JsonResponse({"Error":"No se puede acceder a este enlace"}, safe=False)
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


@csrf_exempt
#Iniciar ciclo corregir
def crear_catedra (request):
    respuesta ={
        "type":"error",
        "state":True,
        "creado":False,
        "message":""
    }
    if request.method =="POST":
    
        # recuperando datos
        cod_materia = request.POST.get("cod_materia")
        cantidad = int(request.POST.get("cantidad"))
        coordinador_dui = request.POST.get("coordinador_dui")
        anio = request.POST.get("anio")
        ciclo_par = request.POST.get("ciclo_par")
        fecha_inicio=request.POST.get("fecha_inicio")
        fecha_fin=request.POST.get("fecha_fin")
        if ciclo_par==True: ciclo='II'
        else: ciclo='I'
        #  recuperando materia
        try:
            materia=Materia.objects.get(pk=cod_materia) 
        except Materia.DoesNotExist:
            respuesta["message"]="La materia "+cod_materia+" no existe."   
            return JsonResponse(respuesta, safe=False)
            

        existe=Catedra.objects.filter(cod_materia=materia,anio=anio,ciclo_par=ciclo_par).exists()
        if existe==False:
            catedra=Catedra(cod_materia=materia,anio=anio,ciclo_par=ciclo_par,fecha_inicio=fecha_inicio,fecha_fin=fecha_fin)
            catedra.save()
        else:
            
            respuesta["type"]="warning"          
            respuesta["message"]="La Catedra de la Materia "+materia.nombre_materia+" ya existe para el ciclo "+ciclo+" - "+anio+"."   
            return JsonResponse(respuesta, safe=False)
        
        
        # recuperando coordinador
        try:
            coordinador=Docente.objects.get(pk=coordinador_dui)
        except Docente.DoesNotExist:
            respuesta["message"]="La materia "+cod_materia+" no existe."   
            return JsonResponse(respuesta, safe=False)
        
        # agregando al coordinador a la catedra
        try:
            
            add=EsParteDe(cod_catedra=catedra,dui=coordinador,coordinador=True)
            add.save()
        except :
            respuesta["message"]="Error al agregar Coordinador "+coordinador.nombre+"."   
            return JsonResponse(respuesta, safe=False)
        
        # agregando todos los docentes a la catedra
        # recuperando los docentes
        for i in range(1,cantidad+1):
                nombre=request.POST.get("docente"+str(i))
                try:
                    doc=Docente.objects.get(dui=nombre) 
                    add=EsParteDe(cod_catedra=catedra,dui=doc,coordinador=False)
                    add.save()
                except Docente.DoesNotExist:
                    respuesta["message"]="Error al agregar Docente con dui "+nombre   
                    return JsonResponse(respuesta, safe=False)
            
        respuesta["type"]="success"
        respuesta["message"]="La Catedra de "+catedra.cod_materia.nombre_materia+" ciclo "+ciclo+" - "+anio+" ha sido configurada correctamente."   
        respuesta["creado"]=True
        return JsonResponse(respuesta, safe=False)
    else:
        respuesta["message"]="Debe utilizar metodo POST para configurar catedra"  
        return JsonResponse(respuesta, safe=False)

