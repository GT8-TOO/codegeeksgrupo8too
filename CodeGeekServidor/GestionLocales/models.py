from django.db import models

# Create your models here.

class Edificio(models.Model):
    cod_edificio = models.CharField(primary_key=True, max_length=10)
    cod_escuela = models.ForeignKey('Escuela', models.DO_NOTHING, db_column='cod_escuela', null=True)
    nombre_edificio = models.CharField(max_length=256)
    longitud = models.FloatField(blank=True, null=True)
    latitud = models.FloatField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'edificio'
    def __str__(self):
        return f'{self.cod_edificio ,self.nombre_edificio}'

class Escuela(models.Model):
    cod_escuela = models.CharField(primary_key=True, max_length=10)
    nombre_escuela = models.CharField(max_length=256)

    class Meta:
        managed = True
        db_table = 'escuela'
    
    def __str__(self):
        return f'{self.nombre_escuela}'

class Local(models.Model):
    cod_local = models.CharField(primary_key=True, max_length=10)
    cod_edificio = models.ForeignKey(Edificio, models.DO_NOTHING, db_column='cod_edificio', null=True)
    nombre_local = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=256)
    nivel = models.BigIntegerField()
    altitud = models.FloatField(blank=True, null=True)
    puntuacion = models.FloatField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'local'

    def __str__(self):
        return f'{self.cod_local ,self.nombre_local}'

class Puntuacion(models.Model):
    dui = models.ForeignKey('GestionUsuarios.Docente', models.DO_NOTHING, db_column='doc_dui', related_name='puntuaciones', null=True)
    cod_local = models.ForeignKey(Local, models.DO_NOTHING, db_column='cod_local', related_name='puntuaciones_docentes', null=True) #Field E303 ralated_name

    class Meta:
        managed = True
        db_table = 'puntuacion'
        unique_together = (('dui', 'cod_local'),)


class Imagen(models.Model):
    cod_imagen = models.CharField(primary_key=True, max_length=10)
    cod_local = models.ForeignKey('Local', models.DO_NOTHING, db_column='cod_local', null=True)
    titulo = models.CharField(max_length=256, blank=True, null=True)
    descripcion = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'imagen'
