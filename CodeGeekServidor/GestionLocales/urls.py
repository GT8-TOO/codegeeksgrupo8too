from django.urls import path
from GestionLocales.views import *
from .generarReporte import reporte_local

urlpatterns = [
    path('solicitaredificios-json/', get_edificios),
    path('solicitarlocales-json/', get_locales),
    path('solicitarescuelas-json/', get_escuelas),
    path('registrarlocal-json/', registrar_local),
    path('solicitarimagenes-json/', get_imagenes_local),
    path('nuevacalificacion/', nueva_calificacion),
    path('generar/pdf',reporte_local),
]
