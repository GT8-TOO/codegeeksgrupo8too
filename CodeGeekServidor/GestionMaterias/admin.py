from django.contrib import admin
from GestionMaterias.models import  Catedra, EsParteDe, Imparte, Materia, Pensum,Ciclo

# Register your models here.
admin.site.register(Catedra)
admin.site.register(Ciclo)
admin.site.register(EsParteDe)

admin.site.register(Imparte)
admin.site.register(Materia)
admin.site.register(Pensum)