from django.shortcuts import render

# Create your views here.

def vista_login(request):
    return render(request, 'index.html')
def vista_register(request):
    return render(request, 'index.html')