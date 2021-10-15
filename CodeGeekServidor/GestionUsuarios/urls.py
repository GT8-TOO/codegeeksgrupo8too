from django.urls import path
from GestionUsuarios.views import home

urlpatterns = [
    path('home/', home),
]
