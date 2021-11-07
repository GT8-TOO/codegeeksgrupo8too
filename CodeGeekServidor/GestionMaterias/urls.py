from django.urls import path
from GestionMaterias.views import *
from .reporte_materias import reporte_materias

urlpatterns = [
    path('registrarMateria/', registrar_materia),
    path('solicitarmaterias-json/', mandar_materias),
    path('catedra/', crear_catedra),
    path('registrarcarrera/', registrar_carrera),
    path('generar/pdf/<str:idMateria>',reporte_materias, name="reporte_materias"),
    #path('generar/pdf/escuela/<str:idEscuela>',reporte_materias),
]
