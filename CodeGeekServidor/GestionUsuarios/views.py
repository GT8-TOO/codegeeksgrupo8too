from django.contrib.auth.models import User
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from GestionUsuarios.models import Administrador, Empleado, Docente
from GestionLocales.models import Escuela
from django.contrib.auth import authenticate, login, logout
from django.db.models.query_utils import Q
from datetime import datetime	
import re
from .serializers import DocenteSerializer

# Create your views here.

def home (request):
    return render (request, "index.html")

@csrf_exempt
def iniciar_sesion (request):
    if request.method =="POST":
        #Aqui iria la logica del metodo
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            request.session.create()
            sesion =request.session.session_key;
            admin=user.usuario_administrador
            if admin==True:
                #print((user.administrador.all())[0].dui)
                #print(user.usuario_administrador)
                return JsonResponse({"dui":(user.administrador.all())[0].dui,"admin":user.usuario_administrador,"logeado":True,"token":sesion}, safe=True)        
            else:
                #print((user.docente.all())[0].dui)
                return JsonResponse({"dui":(user.docente.all())[0].dui,"admin":user.usuario_administrador,"logeado":True, "token":sesion}, safe=True)
    elif request.method =="GET":
        #Aqui ira la logica de este metodo
        pass
    return JsonResponse({"logeado":False,"state":True,"type":"error","title":"Contraseña Incorrecta","message":""}, safe=False)


@csrf_exempt
def registrar_usuario(request):
    #Metodo que permite registrarse
    respuesta ={
        "type":"",
        "state":True,
        "title":"",
        "Creado":False,
        "message":""
    }
    validar_dui = list(Docente.objects.filter(Q(dui=request.POST.get('dui'))).values('dui'))
    validar_empleado = list(Empleado.objects.filter(Q(email=request.POST.get('email'))).values('email'))
    if len(validar_dui)==0:
        if len(validar_empleado)==0:
            if request.method =="POST":
                dui = request.POST.get('dui')
                nombres =request.POST.get('nombre')
                apellidos =request.POST.get('apellidos')
                email=request.POST.get('email')
                nit = request.POST.get('nit')
                password =request.POST.get('password')
                fecha = request.POST.get('fechaNacimiento')
                escuela = request.POST.get('escuela')
                try:
                    empleado=Empleado.objects.create_user(email,password)
                    docente=Docente()
                    docente.dui=dui
                    docente.nit=nit
                    docente.nombre = nombres
                    docente.apellidos = apellidos
                    docente.cod_empleado=empleado
                    #docente.cod_escuela=Escuela.objects.get(cod_escuela=escuela)#Comentar si no se esta enviando el codigo de la escuela
                    docente.fecha_nacimiento=datetime.strptime(fecha, '%m/%d/%Y')#Comentar si se hace la solicitud desde Thunder client
                    docente.save()

                except:
                    respuesta["type"]="error"
                    respuesta["title"]="Error al registrar docente"
                    respuesta["message"]="Existe un error en los datos proporcionados."
                    return JsonResponse(respuesta, safe=False)
                return JsonResponse({"Creado":True}, safe=False)
            else:
                respuesta["type"]="error"
                respuesta["title"]="Error al registrar docente"
                respuesta["message"]="Los datos no se enviarion de forma segura."
                return JsonResponse(respuesta, safe=False)
        else:
            respuesta["type"]="error"
            respuesta["title"]="Error al registrar docente"
            respuesta["message"]="El correo ya fue registrado"
            return JsonResponse(respuesta, safe=False)
    else:
        respuesta["type"]="error"
        respuesta["title"]="Error al registrar docente"
        respuesta["message"]="El docente ya fue registrado"
        return JsonResponse(respuesta, safe=False)

def logout_usuario(request):
    logout(request)
    return JsonResponse({"message":"El usuario a cerrado sesión."}, safe=False)
    

def vista_registrarse (request):
    return render (request, "index.html")

def vista_login (request):
    return render (request, "index.html")


@csrf_exempt
def registrar_admin(request):
    #Metodo que permite registrarse

    dui = request.POST.get('dui')
    nombres =request.POST.get('nombre')
    apellidos =request.POST.get('apellidos')
    email=request.POST.get('email')
    nit = request.POST.get('nit')
    password =request.POST.get('password')
    fecha = request.POST.get('fechaNacimiento')
    escuela= request.POST.get('codigoEscuela')
    
    try:
        empleado=Empleado.objects.create_superuser(email,password)

        Administrador.objects.create(
            dui=dui,
            nit=nit,
            nombre=nombres,
            apellidos=apellidos,
            cod_empleado=empleado,
            cod_escuela=Escuela.objects.get(cod_escuela=escuela),
            #fecha_nacimiento=datetime.strptime(fecha, '%m/%d/%Y')
        )

    except:
        return JsonResponse({"Creado":False}, safe=False)

    return JsonResponse({"Creado":True}, safe=False)

@csrf_exempt
def obtener_usuario(request):
    respuesta ={
            "type":"error",
            "state":True,
            "title":"",
            "encontrado":False,
            "message":""
            }
    if request.method =="POST":
        dui=request.POST.get('dui')
        docente = Docente.objects.filter(dui=dui).values('dui','nit', 'nombre','apellidos', 'cod_escuela', 'cod_empleado', 'fecha_nacimiento')
        administrador = Administrador.objects.filter(dui=dui).values('dui','nit', 'nombre','apellidos', 'cod_escuela', 'cod_empleado', 'fecha_nacimiento')
        
        if docente:
            empleado=Empleado.objects.filter(cod_empleado=docente[0].get("cod_empleado")).values('email')
            docente = list(docente)
            docente[0]['email']=empleado[0].get('email')
            return JsonResponse(docente,safe=False)
        
        elif administrador:
            
            empleado=Empleado.objects.filter(cod_empleado=administrador[0].get("cod_empleado")).values('email')
            administrador = list(administrador)
            administrador[0]['email']=empleado[0].get('email')
            return JsonResponse(administrador,safe=False)
        else:
            respuesta["title"]="Usuario no encontrado"
            respuesta["message"]="El usuario no existe"   
            return JsonResponse(respuesta,safe=False)
    
    else:
        return JsonResponse({"message" : "Los datos no fueron enviados de forma segura."},safe=False)

@csrf_exempt
def docentes_escuela(request):
    # recuperando admin

    if request.method =="POST":
        dui=request.POST.get('admin_dui')
        admin=Administrador.objects.get(dui=dui)
        cod_escuela=admin.cod_escuela.cod_escuela
        docentes=Docente.objects.filter(cod_escuela__cod_escuela=cod_escuela)
        serializer = DocenteSerializer(docentes, many = True)
        return JsonResponse(serializer.data, safe=False)
   
    else: 
        return JsonResponse({"message" : "Los datos no fueron enviados de forma segura."}, safe=False)
@csrf_exempt
def docentes_sin_escuela(request):
    if request.method =="POST":
        docentes=Docente.objects.filter(cod_escuela__cod_escuela__isnull=True)
        serializer = DocenteSerializer(docentes, many = True)
        return JsonResponse(serializer.data, safe=False)
    else: 
        return JsonResponse({"message" : "Los datos no fueron enviados de forma segura."}, safe=False)


@csrf_exempt
#añadi el state que es el que ocupo yo para mostrar mensajes
def asignar_escuela(request):
    respuesta ={
        "type":"",
        "message":""
    }
    if request.method =="POST":
        try:
            cod_escuela=request.POST.get('codEscuela')
            escuela=Escuela.objects.get(pk=cod_escuela)
        except Escuela.DoesNotExist:
            respuesta["type"]="error"
            respuesta["message"]="La Escuela no existe."
            return JsonResponse(respuesta, safe=False)
        try:
            dui=request.POST.get('dui')
            
            docente=Docente.objects.get(pk=dui)
            docente.cod_escuela=escuela
            docente.save()
            respuesta["type"]="success"
            respuesta["message"]="El Docente "+docente.nombre+" ha sido asignado a la "+escuela.nombre_escuela+" correctamente."
            return JsonResponse(respuesta, safe=False)
        except Docente.DoesNotExist:
            respuesta["type"]="error"
            respuesta["message"]="El Docente no existe."
            return JsonResponse(respuesta, safe=False)
    else: 
        return JsonResponse({"message" : "Los datos no fueron enviados de forma segura."}, safe=False)

@csrf_exempt
#Metodo para mandar correos
def mandar_correos(request):
    respuesta ={
        "type":"",
        "state":True,
        "title":"",
        "message":""
    }
    if request.method =="POST":
        email = request.POST.get("email")
        dui = request.POST.get("dui")
        asunto = request.POST.get("asunto")
        cuerpo = request.POST.get("cuerpo")
        print(email, '\n')
        print(dui, '\n')
        print(asunto, '\n')
        print(cuerpo, '\n')
        respuesta["type"]="success"
        respuesta["title"]="Informacion enviada"
        respuesta["state"]=True
        respuesta["message"]="La informacion se envio de manera correcta, falta la parte de servidor"
    else:
        return JsonResponse({"Error":"No se puede acceder a este enlace"}, safe=False)
 
    return JsonResponse(respuesta, safe=False)
