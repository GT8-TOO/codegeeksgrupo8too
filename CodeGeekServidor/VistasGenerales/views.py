from django.shortcuts import render

# Create your views here.
def inicio (request):
    return render(request, "index.html")

def vista_registrarse (request):
    return render (request, "index.html")

def vista_login (request):
    return render (request, "index.html")

#Vistas usuario normal, de docente
def vista_usuario_home(request):
    return render (request, "index.html")

def vista_usuario_profile(request):
    return render (request, "index.html")

def vista_usuario_requestlocal(request):
    return render (request, "index.html")

def vista_usuario_reviewrequest(request):
    return render (request, "index.html")

def vista_usuario_local(request):
    return render (request, "index.html")

def vista_usuario_report(request):
    return render (request, "index.html")

def vista_usuario_sendemail(request):
    return render (request, "index.html")

#Vistas de usuario administrador
def vista_usuario_registercarrer(request):
    return render (request, "index.html")

def vista_usuario_start(request):
    return render (request, "index.html")

def vista_usuario_authorize(request):
    return render (request, "index.html")

