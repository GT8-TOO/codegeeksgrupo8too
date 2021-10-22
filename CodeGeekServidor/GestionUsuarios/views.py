from django.contrib.auth.models import User
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from GestionUsuarios.models import Administrador, Empleado, Docente
from GestionLocales.models import Escuela
from django.contrib.auth import authenticate, login
from django.db.models.query_utils import Q
from datetime import datetime	
import re

# Create your views here.
def home (request):
    return render (request, "index.html")

@csrf_exempt
def iniciar_sesion (request):
    if request.method =="POST":
        print(request.session)
        #Aqui iria la logica del metodo
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            admin=user.usuario_administrador
            if admin==True:
                print((user.administrador.all())[0].dui)
                print(user.usuario_administrador)
                return JsonResponse({"dui":(user.administrador.all())[0].dui,"admin":user.usuario_administrador,"logeado":True}, safe=False)        
                
            else:
                print((user.docente.all())[0].dui)
                return JsonResponse({"dui":(user.docente.all())[0].dui,"admin":user.usuario_administrador,"logeado":True}, safe=False)
    elif request.method =="GET":
        #Aqui ira la logica de este metodo
        pass
    return JsonResponse({"logeado":False,"state":True,"type":"error","title":"Contraseña Incorrecta","message":""}, safe=False)


@csrf_exempt
def registrar_usuario(request):
    #Metodo que permite registrarse
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
                    docente.cod_escuela=Escuela.objects.get(cod_escuela=escuela)
                    docente.fecha_nacimiento=datetime.strptime(fecha, '%m/%d/%Y')#Comentar si se hace la solicitud desde Thunder client
                    docente.save()

                except:
                    return JsonResponse({"Creado":False, "state": True,"type":"error" ,"title":"Error al crear usuario", "message":"F"}, safe=False)
                return JsonResponse({"Creado":True}, safe=False)
            else:
                return JsonResponse({"Creado":False, "state": True,"type":"error" ,"title":"Error al crear usuario", "message":"Los datos no se enviarion de forma segura"}, safe=False)
        else:
            return JsonResponse({"Creado":False, "state": True,"type":"error" ,"title":"Error al registrar docente", "message":"El correo ya fue registrado"}, safe=False)
    else:
        return JsonResponse({"Creado":False, "state": True,"type":"error" ,"title":"Error al registrar docente", "message":"El docente ya fue registrado"}, safe=False)
    
def vista_registrarse (request):
    return render (request, "index.html")

def vista_login (request):
    return render (request, "index.html")


# @csrf_exempt
def registrar_admin(request):
    #Metodo que permite registrarse

    dui = request.POST.get('dui')
    nombres =request.POST.get('nombre')
    apellidos =request.POST.get('apellidos')
    email=request.POST.get('email')
    nit = request.POST.get('nit')
    password =request.POST.get('password')
    fecha = request.POST.get('fechaNacimiento')
    escu="EISI"

    
    try:
        empleado=Empleado.objects.create_superuser(email,password)
   
        admin=Administrador()
        admin.dui=dui
        admin.nit=nit
        admin.nombre = nombres
        admin.apellidos = apellidos
        admin.cod_empleado=empleado
        # admin.fecha_nacimiento=fecha
        admin.save()

    except:
        return JsonResponse({"Creado":False}, safe=False)

    return JsonResponse({"Creado":True}, safe=False)

def vista_registrarse (request):
    return render (request, "index.html")

def vista_login (request):
    return render (request, "index.html")
