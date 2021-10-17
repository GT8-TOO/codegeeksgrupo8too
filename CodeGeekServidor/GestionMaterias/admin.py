from django.contrib import admin
from GestionMaterias.models import Catedra,EsParteDe
from GestionLocales.models import Escuela

# Register your models here.
admin.site.register(Catedra)
admin.site.register(EsParteDe)
admin.site.register(Escuela)