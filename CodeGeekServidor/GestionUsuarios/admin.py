from django.contrib import admin
from GestionUsuarios.models import Administrador, Empleado, Docente #, Notificacion

# Register your models here.
admin.site.register(Empleado)
admin.site.register(Docente)
admin.site.register(Administrador)
# admin.site.register(Notificacion)