from django.urls import path
from GestionLocales.views import *

urlpatterns = [
    path('solicitarescuelas-json/', get_escuelas),
    path('registrarlocal-json/', registrar_local),
]
