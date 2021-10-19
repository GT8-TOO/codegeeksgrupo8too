from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from GestionUsuarios.models import Empleado, Docente
from GestionLocales.models import Escuela
import re

# Create your views here.
def home (request):
    return render (request, "index.html")

@csrf_exempt
def iniciar_sesion (request):
    if request.method =="POST":
        #Aqui iria la logica del metodo
        email = request.POST["email"]
        password = request.POST["password"]
        estado = request.POST["estado"]
        print(email)
        print(password)
        print(estado)
        return JsonResponse({"Funciono":"SI"}, safe=False)
    elif request.method =="GET":
        #Aqui ira la logica de este metodo
        pass
    return JsonResponse({"Funciono":"SI"}, safe=False)


@csrf_exempt
def registrar_usuario(request):
    #Metodo que permite registrarse

    dui = request.POST.get('dui')
    nombres =request.POST.get('nombre')
    apellidos =request.POST.get('apellidos')
    email=request.POST.get('email')
    nit = request.POST.get('nit')
    password =request.POST.get('password')
    fecha = request.POST.get('fechaNacimiento')
    escu="EISI"

    base="base@ues.edu.sv"
    base=re.findall('@+ues.edu.sv',base)
    email2 = re.findall('@+ues.edu.sv',email)

    if base == email2:
        try:
            Empleado.objects.create_user(email,dui,nombres,password)
            cod_escuelas = Escuela(cod_escuela=escu)
            cod_empleado = Empleado(dui=dui)
            docente=Docente.objects.create(
            dui=dui,
            nit=nit,
            nombre=nombres,
            apellidos=fecha,
            cod_escuela=cod_escuelas,
            cod_empleado = cod_empleado
            )
            docente.save()
        except:
            return JsonResponse({"Creado":False}, safe=False)
        return JsonResponse({"Creado":True}, safe=False)
    else:
        return JsonResponse({"mensajeerror":"El correo debe ser institucional", "errorDatos":True}, safe=False)

def vista_registrarse (request):
    return render (request, "index.html")

def vista_login (request):
    return render (request, "index.html")
