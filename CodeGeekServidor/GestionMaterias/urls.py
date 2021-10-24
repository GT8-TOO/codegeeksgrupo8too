from django.urls import path
from GestionMaterias.views import *

urlpatterns = [
    path('registrarMateria/', registrar_materia),
    path('solicitarmaterias-json/', mandar_materias),
]
