from django.urls import path
from GestionLocales.views import *

urlpatterns = [
    path('solicitaredificios-json/', get_edificios),
    path('solicitarlocales-json/', get_locales),
    path('solicitarescuelas-json/', get_escuelas),
    path('registrarlocal-json/', registrar_local),
]
