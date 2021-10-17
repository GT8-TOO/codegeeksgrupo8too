from django.db import models

# Create your models here.
class Catedra(models.Model):
    cod_catedra = models.BigIntegerField(primary_key=True)
    cod_materia = models.ForeignKey('Materia', models.DO_NOTHING, db_column='cod_materia', null=True)
    anio = models.BigIntegerField(blank=True, null=True)
    ciclo_par = models.BigIntegerField(blank=True, null=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()

    class Meta:
        managed = True
        db_table = 'catedra'

class Ciclo(models.Model):
    anio_en_pensum = models.BigIntegerField(db_column='anio_en__pensum')  # Field renamed because it contained more than one '_' in a row.
    numero_de_ciclo = models.BigIntegerField()
    cod_pensum = models.OneToOneField('Pensum', models.DO_NOTHING, db_column='cod_pensum', primary_key=True)

    class Meta:
        managed = True
        db_table = 'ciclo'

class EsParteDe(models.Model):
    dui = models.ForeignKey('GestionUsuarios.Docente', models.DO_NOTHING, db_column='dui', related_name='esta_en', null=True) #Field.E303
    cod_catedra = models.ForeignKey(Catedra, models.DO_NOTHING, db_column='cod_catedra', null=True)
    coordinador = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'es_parte_de'
        unique_together = (('dui', 'cod_catedra'),)


class Dia(models.Model):
    cod_dia = models.BigIntegerField(primary_key=True)
    nombre_dia = models.CharField(max_length=15)

    class Meta:
        managed = True
        db_table = 'dia'

class Hora(models.Model):
    cod_hora = models.BigIntegerField(primary_key=True)
    hora_inicio = models.DateField()
    hora_fin = models.DateField()

    class Meta:
        managed = True
        db_table = 'hora'

class Horario(models.Model):
    cod_hora = models.ForeignKey(Hora, models.DO_NOTHING, db_column='cod_hora', null=True)
    cod_dia = models.ForeignKey(Dia, models.DO_NOTHING, db_column='cod_dia', null=True)
    cod_horario = models.BigIntegerField(primary_key=True)

    class Meta:
        managed = True
        db_table = 'horario'

class Imparte(models.Model):
    numero_de_ciclo = models.BigIntegerField(primary_key=True)
    cod_materia = models.ForeignKey('Materia', models.DO_NOTHING, db_column='cod_materia', null=True)
    cod_pensum = models.CharField(max_length=10)
    ciclo_par = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'imparte'
        unique_together = (('numero_de_ciclo', 'cod_materia'),)

class Materia(models.Model):
    cod_materia = models.CharField(primary_key=True, max_length=6)
    nombre_materia = models.CharField(max_length=50)
    unidades_valorativas = models.BigIntegerField(blank=True, null=True)
    obligatoria = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'materia'

class Pensum(models.Model):
    cod_pensum = models.CharField(primary_key=True, max_length=10)
    cod_escuela = models.ForeignKey('GestionLocales.Escuela', models.DO_NOTHING, db_column='cod_escuela', blank=True, null=True)
    anio_publicacion = models.DateField()
    carrera = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'pensum'

class RequisitoDe(models.Model):
    mat_cod_materia = models.OneToOneField(Materia, models.DO_NOTHING, db_column='mat_cod_materia', primary_key=True)
    cod_materia = models.ForeignKey(Materia, models.DO_NOTHING, db_column='cod_materia', related_name='cod_materia_RquisitoDe', null=True) #field.E305

    class Meta:
        managed = True
        db_table = 'requisito_de'
        unique_together = (('mat_cod_materia', 'cod_materia'),)