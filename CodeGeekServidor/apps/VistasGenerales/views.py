from django.shortcuts import render

# Create your views here.
#Vista de pagina de inicio de la aplicacion
def inicio (request):
    return render(request, "index.html")
