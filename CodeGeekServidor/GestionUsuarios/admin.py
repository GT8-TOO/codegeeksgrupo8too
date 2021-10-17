from django.contrib import admin
from GestionUsuarios.models import Empleado, Docente

# Register your models here.
admin.site.register(Empleado)
admin.site.register(Docente)