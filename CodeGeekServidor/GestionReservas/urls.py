from django.urls import path
from GestionReservas.views import *

urlpatterns = [
    path('nueva/', nueva_reserva),
    path('cambiarestado/', cambiar_estado),
    path('horario/headers/',horario_headers),
    path('horario/reservasrevisadas/',horario_body),
    path('horario/solicitudes/',solicitud_body),
    path('horario/completo/',get_horario_completo),
    path('solicitarhorarios-json/', get_horario),
    path('solicitud/usuario-json/', get_usuario_solicitud),
]
