from django.contrib import admin
from GestionMaterias.models import Catedra, Dia, EsParteDe, Hora, Horario, Imparte, Materia, Pensum,Ciclo

# Register your models here.
admin.site.register(Catedra)
admin.site.register(Ciclo)
admin.site.register(EsParteDe)
admin.site.register(Dia)
admin.site.register(Hora)
admin.site.register(Horario)
admin.site.register(Imparte)
admin.site.register(Materia)
admin.site.register(Pensum)