from django.db import models

# Create your models here.

class Edificio(models.Model):
    cod_edificio = models.CharField(primary_key=True, max_length=10)
    cod_escuela = models.ForeignKey('Escuela', models.DO_NOTHING, db_column='cod_escuela')
    nombre_edificio = models.CharField(max_length=50)
    longitud = models.FloatField(blank=True, null=True)
    latitud = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'edificio'

class Escuela(models.Model):
    cod_escuela = models.CharField(primary_key=True, max_length=10)
    nombre_escuela = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'escuela'

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

class Puntuacion(models.Model):
    dui = models.BigIntegerField(primary_key=True)
    cod_local = models.ForeignKey(Local, models.DO_NOTHING, db_column='cod_local', related_name='cod_local_Puntuacion') #Field E303 ralated_name

    class Meta:
        managed = False
        db_table = 'puntuacion'
        unique_together = (('dui', 'cod_local'),)


class Imagen(models.Model):
    cod_imagen = models.CharField(primary_key=True, max_length=10)
    cod_local = models.ForeignKey('Local', models.DO_NOTHING, db_column='cod_local')
    titulo = models.CharField(max_length=256, blank=True, null=True)
    descripcion = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'imagen'
