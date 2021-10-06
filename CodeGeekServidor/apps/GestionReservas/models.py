from django.db import models
from GestionUsuarios.models import Administrador
from GestionUsuarios.models import Docente
from CatalogoMaterias.models import Materia
from CatalogoLocales.models import Local


# Create your models here.

class Reserva(models.Model):
    cod_reserva = models.BigIntegerField(primary_key=True)
    cod_horario = models.BigIntegerField()
    cod_local = models.ForeignKey(Local, models.DO_NOTHING, db_column='cod_local', blank=True, null=True)
    cod_materia = models.ForeignKey(Materia, models.DO_NOTHING, db_column='cod_materia', blank=True, null=True)
    doc_dui = models.ForeignKey(Docente, models.DO_NOTHING, db_column='doc_dui')
    emp_dui = models.ForeignKey(Docente, models.DO_NOTHING, db_column='emp_dui')
    dui = models.ForeignKey(Administrador, models.DO_NOTHING, db_column='dui')
    adm_dui = models.BigIntegerField()
    adm_emp_dui = models.ForeignKey(Administrador, models.DO_NOTHING, db_column='adm_emp_dui')
    estado_solicitud = models.CharField(max_length=20)
    fecha_envio = models.DateField()
    fecha_aprobacion = models.DateField()

    class Meta:
        managed = False
        db_table = 'reserva'
