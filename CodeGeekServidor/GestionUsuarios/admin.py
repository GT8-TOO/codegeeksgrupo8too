from django.contrib import admin
from GestionUsuarios.models import Administrador, Empleado, Docente

# Register your models here.
admin.site.register(Empleado)
admin.site.register(Docente)
admin.site.register(Administrador)