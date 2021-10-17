from typing import Tuple
from django.db import models



# Create your models here.

class Reserva(models.Model):
    cod_reserva = models.BigIntegerField(primary_key=True)
    cod_horario = models.BigIntegerField()
    cod_local = models.ForeignKey('GestionLocales.Local', models.DO_NOTHING, db_column='cod_local', blank=True, null=True)
    cod_materia = models.ForeignKey('GestionMaterias.Materia', models.DO_NOTHING, db_column='cod_materia', blank=True, null=True)
    doc_dui = models.ForeignKey('GestionUsuarios.Docente', models.DO_NOTHING, db_column='doc_dui', related_name='doc_dui_Reserva', null=True) #Fields.E304
    adm_emp_dui = models.ForeignKey('GestionUsuarios.Administrador', models.DO_NOTHING, db_column='adm_emp_dui', related_name='adm_emp_dui_Reserva', null=True) #Fields.E304
    estado_solicitud = models.CharField(max_length=20)
    fecha_envio = models.DateField()
    fecha_aprobacion = models.DateField()

    class Meta:
        managed = True
        db_table = 'reserva'