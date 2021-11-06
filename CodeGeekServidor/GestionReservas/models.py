from typing import Tuple
from django.db import models


ESTADO_CHOICES=[('EN_PROCESO', 'En Proceso'),('EN_PROCESO', 'En Proceso'),('ACEPTADA', 'Aceptada'),('DENEGADA', 'Denegada'),('PENDIENTE', 'Pendiente'),]
# Create your models here.

class Reserva(models.Model):
    cod_reserva = models.AutoField(primary_key=True)
    cod_horario = models.ForeignKey('GestionMaterias.Horario', models.DO_NOTHING, db_column='cod_horario', blank=False, null=True)
    cod_local = models.ForeignKey('GestionLocales.Local', models.DO_NOTHING, db_column='cod_local', blank=False, null=True)
    cod_materia = models.ForeignKey('GestionMaterias.Materia', models.DO_NOTHING, db_column='cod_materia', blank=False, null=True)
    doc_dui = models.ForeignKey('GestionUsuarios.Docente', models.DO_NOTHING, db_column='doc_dui', related_name='reservas_realizadas', null=True) #Fields.E304
    adm_cod_empleado = models.ForeignKey('GestionUsuarios.Administrador', models.DO_NOTHING, db_column='adm_cod_empleado', related_name='adm_cod_empleado_Reserva', null=True) #Fields.E304
    estado_solicitud = models.CharField(max_length=20,choices=ESTADO_CHOICES)
    fecha_envio = models.DateField(auto_now=True, null=True)
    fecha_aprobacion = models.DateField(null=True,blank=True)

    class Meta:
        managed = True
        db_table = 'reserva'

    def __str__(self):
        return str(self.cod_reserva)+" - "+str(self.cod_horario)+" - "+str(self.cod_local)+" - "+str(self.cod_materia)