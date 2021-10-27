from django.shortcuts import render

# Create your views here.
def inicio (request):
    return render(request, "index.html")

def vista_registrarse (request):
    return render (request, "index.html")

def vista_login (request):
    return render (request, "index.html")

def vista_usuario(request):
    return render (request, "index.html")

