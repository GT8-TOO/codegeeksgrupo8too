from django.contrib import admin
from .models import Empleado,Administrador,Docente
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(Empleado,UserAdmin)
admin.site.register(Docente)
admin.site.register(Administrador)