from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from GestionUsuarios.models import Empleado, Docente

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
    nombre =request.POST.get('nombre')
    apellidos =request.POST.get('apellidos')
    email=request.POST.get('email')
    nit = request.POST.get('nit')
    password =request.POST.get('password')

    
    try:
        empleado=Empleado.objects.create_user(email,password)
        docente=Docente()
        docente.dui=dui
        docente.nit=nit
        docente.nombre = nombre
        docente.apellidos = apellidos
        docente.cod_empleado=empleado
        docente.save()

    except:
        return JsonResponse({"Creado":dui}, safe=False)

    return JsonResponse({"Creado":True}, safe=False)

def vista_registrarse (request):
    return render (request, "index.html")

def vista_login (request):
    return render (request, "index.html")
