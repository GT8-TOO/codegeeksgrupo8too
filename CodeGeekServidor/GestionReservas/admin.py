from django.contrib import admin
from GestionReservas.models import Reserva
from GestionMaterias.models import  Hora, Horario, Dia

# Register your models here.
admin.site.register(Reserva)
admin.site.register(Dia)
admin.site.register(Hora)
admin.site.register(Horario)