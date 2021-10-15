from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

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
