from django.urls import path
from GestionReservas.views import *

urlpatterns = [
    path('nueva/', nueva_reserva),
]