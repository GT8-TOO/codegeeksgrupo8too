# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
 

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


class Catedra(models.Model):
    cod_catedra = models.BigIntegerField(primary_key=True)
    cod_materia = models.ForeignKey('Materia', models.DO_NOTHING, db_column='cod_materia')
    anio = models.BigIntegerField(blank=True, null=True)
    ciclo_par = models.BigIntegerField(blank=True, null=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()

    class Meta:
        managed = False
        db_table = 'catedra'


class Ciclo(models.Model):
    anio_en_pensum = models.BigIntegerField(db_column='anio_en__pensum')  # Field renamed because it contained more than one '_' in a row.
    numero_de_ciclo = models.BigIntegerField()
    cod_pensum = models.OneToOneField('Pensum', models.DO_NOTHING, db_column='cod_pensum', primary_key=True)

    class Meta:
        managed = False
        db_table = 'ciclo'


class Dia(models.Model):
    cod_dia = models.BigIntegerField(primary_key=True)
    nombre_dia = models.CharField(max_length=15)

    class Meta:
        managed = False
        db_table = 'dia'


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


class Edificio(models.Model):
    cod_edificio = models.CharField(primary_key=True, max_length=10)
    cod_escuela = models.ForeignKey('Escuela', models.DO_NOTHING, db_column='cod_escuela')
    nombre_edificio = models.CharField(max_length=50)
    longitud = models.FloatField(blank=True, null=True)
    latitud = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'edificio'


class EsParteDe(models.Model):
    dui = models.OneToOneField(Docente, models.DO_NOTHING, db_column='dui', primary_key=True)
    emp_dui = models.ForeignKey(Docente, models.DO_NOTHING, db_column='emp_dui', related_name='emp_duis')
    cod_catedra = models.ForeignKey(Catedra, models.DO_NOTHING, db_column='cod_catedra')
    coordinador = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'es_parte_de'
        unique_together = (('dui', 'emp_dui', 'cod_catedra'),)


class Escuela(models.Model):
    cod_escuela = models.CharField(primary_key=True, max_length=10)
    nombre_escuela = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'escuela'


class Hora(models.Model):
    cod_hora = models.BigIntegerField(primary_key=True)
    hora_inicio = models.DateField()
    hora_fin = models.DateField()

    class Meta:
        managed = False
        db_table = 'hora'


class Horario(models.Model):
    cod_hora = models.ForeignKey(Hora, models.DO_NOTHING, db_column='cod_hora')
    cod_dia = models.ForeignKey(Dia, models.DO_NOTHING, db_column='cod_dia')
    cod_horario = models.BigIntegerField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'horario'


class Imagen(models.Model):
    cod_imagen = models.CharField(primary_key=True, max_length=10)
    cod_local = models.ForeignKey('Local', models.DO_NOTHING, db_column='cod_local')
    titulo = models.CharField(max_length=256, blank=True, null=True)
    descripcion = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'imagen'


class Imparte(models.Model):
    numero_de_ciclo = models.BigIntegerField(primary_key=True)
    cod_materia = models.ForeignKey('Materia', models.DO_NOTHING, db_column='cod_materia')
    cod_pensum = models.CharField(max_length=10)
    ciclo_par = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'imparte'
        unique_together = (('numero_de_ciclo', 'cod_materia'),)


class Local(models.Model):
    cod_local = models.CharField(primary_key=True, max_length=10)
    cod_edificio = models.ForeignKey(Edificio, models.DO_NOTHING, db_column='cod_edificio')
    nombre_local = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=50)
    nivel = models.BigIntegerField()
    altitud = models.FloatField(blank=True, null=True)
    puntuacion = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'local'


class Materia(models.Model):
    cod_materia = models.CharField(primary_key=True, max_length=6)
    nombre_materia = models.CharField(max_length=50)
    unidades_valorativas = models.BigIntegerField(blank=True, null=True)
    obligatoria = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'materia'


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


class Pensum(models.Model):
    cod_pensum = models.CharField(primary_key=True, max_length=10)
    cod_escuela = models.ForeignKey(Escuela, models.DO_NOTHING, db_column='cod_escuela', blank=True, null=True)
    anio_publicacion = models.DateField()
    carrera = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pensum'


class Puntuacion(models.Model):
    dui = models.BigIntegerField(primary_key=True)
    cod_local = models.ForeignKey(Local, models.DO_NOTHING, db_column='cod_local', related_name='cod_local_Puntuacion') #Field E303 ralated_name

    class Meta:
        managed = False
        db_table = 'puntuacion'
        unique_together = (('dui', 'cod_local'),)


class RequisitoDe(models.Model):
    mat_cod_materia = models.OneToOneField(Materia, models.DO_NOTHING, db_column='mat_cod_materia', primary_key=True)
    cod_materia = models.ForeignKey(Materia, models.DO_NOTHING, db_column='cod_materia', related_name='cod_materia_requisitoDe') #Fields.E305

    class Meta:
        managed = False
        db_table = 'requisito_de'
        unique_together = (('mat_cod_materia', 'cod_materia'),)


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
