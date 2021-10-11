from django.db import models
from GestionUsuarios.models import Administrador
from GestionUsuarios.models import Docente
from GestionMaterias.models import Materia
from GestionLocales.models import Local


# Create your models here.

class Reserva(models.Model):
    cod_reserva = models.BigIntegerField(primary_key=True)
    cod_horario = models.BigIntegerField()
    cod_local = models.ForeignKey(Local, models.DO_NOTHING, db_column='cod_local', blank=True, null=True)
    cod_materia = models.ForeignKey(Materia, models.DO_NOTHING, db_column='cod_materia', blank=True, null=True)
    doc_dui = models.ForeignKey(Docente, models.DO_NOTHING, db_column='doc_dui', related_name='doc_dui_Reserva') #Fields.E304
    emp_dui = models.ForeignKey(Docente, models.DO_NOTHING, db_column='emp_dui')
    dui = models.ForeignKey(Administrador, models.DO_NOTHING, db_column='dui')
    adm_dui = models.BigIntegerField()
    adm_emp_dui = models.ForeignKey(Administrador, models.DO_NOTHING, db_column='adm_emp_dui', related_name='adm_emp_dui_Reserva') #Fields.E304
    estado_solicitud = models.CharField(max_length=20)
    fecha_envio = models.DateField()
    fecha_aprobacion = models.DateField()

    class Meta:
        managed = False
        db_table = 'reserva'