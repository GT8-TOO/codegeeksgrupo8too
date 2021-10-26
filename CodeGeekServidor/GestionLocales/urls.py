from django.urls import path
from GestionLocales.views import *

urlpatterns = [
    path('solicitaredificios-json/', get_edificios),
    path('solicitarlocales-json/', get_locales),
    path('registrarlocal-json/', registrar_local),
]
