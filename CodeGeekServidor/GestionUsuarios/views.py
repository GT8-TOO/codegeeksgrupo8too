from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from GestionUsuarios.models import Empleado

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

    dui = request.POST['dui']
    nombre =request.POST['nombre']
    email=request.POST['email']
    #dui = request.POST['nit']
    password =request.POST['password']

    
    try:
        Empleado.objects.create_user(email,dui,nombre,password)
    except:
        return JsonResponse({"Creado":False}, safe=False)

    return JsonResponse({"Creado":True}, safe=False)

def vista_registrarse (request):
    return render (request, "index.html")

def vista_login (request):
    return render (request, "index.html")
