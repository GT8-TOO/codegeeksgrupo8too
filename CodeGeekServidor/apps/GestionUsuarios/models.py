from django.db import models

# Create your models here.

class Administrador(models.Model):
    dui = models.BigIntegerField(primary_key=True)
    emp_dui = models.BigIntegerField()
    cod_escuela = models.ForeignKey('Escuela', models.DO_NOTHING, db_column='cod_escuela')
    nit = models.BigIntegerField(blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    password = models.CharField(max_length=256, blank=True, null=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, blank=True, null=True)
    codigo_administrador = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'administrador'
        unique_together = (('dui', 'emp_dui'),)

class Docente(models.Model):
    dui = models.BigIntegerField(primary_key=True)
    cod_escuela = models.ForeignKey('Escuela', models.DO_NOTHING, db_column='cod_escuela')
    nit = models.BigIntegerField(blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    password = models.CharField(max_length=256, blank=True, null=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, blank=True, null=True)
    emp_dui = models.BigIntegerField()
    estado = models.CharField(max_length=20)
    codigo_docente = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'docente'
        unique_together = (('dui', 'emp_dui'),)

class Notificacion(models.Model):
    cod_notificacion = models.BigIntegerField(primary_key=True)
    dui = models.BigIntegerField(blank=True, null=True)
    cod_reserva = models.ForeignKey('Reserva', models.DO_NOTHING, db_column='cod_reserva', blank=True, null=True)
    visto = models.BigIntegerField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    hora = models.DateField(blank=True, null=True)
    titulo = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'notificacion'

