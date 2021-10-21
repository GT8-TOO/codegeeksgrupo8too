from typing import Tuple
from django.db import models



# Create your models here.

class Reserva(models.Model):
    cod_reserva = models.AutoField(primary_key=True)
    cod_horario = models.ForeignKey('GestionMaterias.Horario', models.DO_NOTHING, db_column='cod_horario', blank=False, null=True)
    cod_local = models.ForeignKey('GestionLocales.Local', models.DO_NOTHING, db_column='cod_local', blank=False, null=True)
    cod_materia = models.ForeignKey('GestionMaterias.Materia', models.DO_NOTHING, db_column='cod_materia', blank=False, null=True)
    doc_dui = models.ForeignKey('GestionUsuarios.Docente', models.DO_NOTHING, db_column='doc_dui', related_name='reservas_realizadas', null=True) #Fields.E304
    adm_emp_dui = models.ForeignKey('GestionUsuarios.Administrador', models.DO_NOTHING, db_column='adm_emp_dui', related_name='adm_emp_dui_Reserva', null=True) #Fields.E304
    estado_solicitud = models.CharField(max_length=20)
    fecha_envio = models.DateField(auto_now=True, null=True)
    fecha_aprobacion = models.DateField(null=True,blank=True)

    class Meta:
        managed = True
        db_table = 'reserva'

    def __str__(self):
        return f'{self.cod_reserva, self.cod_materia}'