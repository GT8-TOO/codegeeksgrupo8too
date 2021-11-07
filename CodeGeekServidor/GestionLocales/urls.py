from django.urls import path
from GestionLocales.views import *
from .generarReporte import reporte_local, reporte_escuelas

urlpatterns = [
    path('solicitaredificios-json/', get_edificios),
    path('solicitarlocales-json/', get_locales),
    path('solicitarescuelas-json/', get_escuelas),
    path('registrarlocal-json/', registrar_local),
    path('solicitarimagenes-json/', get_imagenes_local),
    path('nuevacalificacion/', nueva_calificacion),
    path('generar/pdf/<str:idLocal>',reporte_local,name="reporte_local"),
    path('generar/pdf/escuela/<str:idEscuela>',reporte_escuelas,name="reporte_escuelas"),
]
