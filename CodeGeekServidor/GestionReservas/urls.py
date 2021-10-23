from django.urls import path
from GestionReservas.views import *

urlpatterns = [
    path('nueva/', nueva_reserva),
    path('cambiarestado/', cambiar_estado),
    path('horario/headers/',horario_headers),
    path('horario/reservas/',horario_body),
    path('horario/solicitudes/',solicitud_body),
]