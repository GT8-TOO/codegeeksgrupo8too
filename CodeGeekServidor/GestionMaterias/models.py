from django.db import models
from GestionUsuarios.models import Docente
from django.core.validators import MaxValueValidator,MinValueValidator
from datetime import datetime
# Create your models here.
class Materia(models.Model):
    cod_materia = models.CharField(primary_key=True, max_length=6)
    nombre_materia = models.CharField(max_length=50)
    unidades_valorativas = models.BigIntegerField(blank=True, null=True)
    obligatoria = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'materia'
    
    def __str__(self):
        return str(self.cod_materia)+" - "+str(self.nombre_materia)

class RequisitoDe(models.Model):
    cod_materia = models.OneToOneField(Materia, models.CASCADE, db_column='cod_materia', primary_key=True)
    cod_materia_requisito = models.ForeignKey(Materia, models.CASCADE, db_column='cod_materia_requisito', related_name='requisito', null=True) #field.E305

    class Meta:
        managed = True
        db_table = 'requisito_de'
        unique_together = ('cod_materia', 'cod_materia_requisito')

class Catedra(models.Model):
    cod_catedra = models.AutoField(primary_key=True)
    cod_materia = models.ForeignKey('Materia', models.CASCADE, db_column='cod_materia', null=True)
    anio = models.BigIntegerField(blank=True, null=True)
    ciclo_par = models.BooleanField(default=False, null=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    docentes = models.ManyToManyField(
        Docente,
        through='EsParteDe',
        through_fields=('cod_catedra', 'dui'),
    )

    def __str__(self):
        return str(self.cod_catedra)+" - "+str(self.cod_materia)

    class Meta:
        managed = True
        db_table = 'catedra'
        unique_together = ('cod_materia', 'anio','ciclo_par')

class Ciclo(models.Model):
    numero_de_ciclo = models.BigIntegerField(primary_key=True)
    anio_en_pensum = models.BigIntegerField(db_column='anio_en_pensum')
    # ciclo_par = models.BooleanField(default=False, null=False)
    class Meta:
        managed = True
        db_table = 'ciclo'

class EsParteDe(models.Model):
    dui = models.ForeignKey(Docente, models.CASCADE, db_column='dui')
    cod_catedra = models.ForeignKey(Catedra, models.CASCADE, db_column='cod_catedra')
    coordinador = models.BooleanField(default=False, null=True)

    class Meta:
        managed = True
        db_table = 'es_parte_de'
        # unique_together = ('dui', 'cod_catedra')


class Dia(models.Model):
    cod_dia = models.BigIntegerField(primary_key=True)
    nombre_dia = models.CharField(max_length=15)

    def __str__(self):
        return self.nombre_dia
    class Meta:
        managed = True
        db_table = 'dia'

class Hora(models.Model):
    cod_hora = models.AutoField(primary_key=True)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()

    def __str__(self):
              return str(self.hora_inicio)+" - "+str(self.hora_fin)
    class Meta:
        managed = True
        db_table = 'hora'
        unique_together = (('hora_inicio', 'hora_fin'),)


class Horario(models.Model):
    cod_hora = models.ForeignKey(Hora, models.CASCADE, db_column='cod_hora', null=True)
    cod_dia = models.ForeignKey(Dia, models.CASCADE, db_column='cod_dia', null=True)
    cod_horario = models.AutoField(primary_key=True)

    def __str__(self):
              return str(self.cod_hora)+" - "+str(self.cod_dia)
    class Meta:
        managed = True
        db_table = 'horario'
        unique_together=(('cod_hora','cod_dia'),)

class Imparte(models.Model):
    numero_de_ciclo = models.ForeignKey('Ciclo', models.CASCADE, db_column='cod_ciclo')
    cod_materia = models.ForeignKey('Materia', models.CASCADE, db_column='cod_materia')
    cod_pensum = models.ForeignKey('Pensum', models.CASCADE, db_column='cod_pensum')
    

    class Meta:
        managed = True
        db_table = 'imparte'
        unique_together = ('numero_de_ciclo', 'cod_materia','cod_pensum')


class Pensum(models.Model):
    cod_pensum = models.CharField(primary_key=True, max_length=10)
    cod_escuela = models.ForeignKey('GestionLocales.Escuela', models.CASCADE, db_column='cod_escuela', blank=True, null=True)
    anio_publicacion =models.PositiveIntegerField(validators=[MaxValueValidator(1950),MinValueValidator(datetime.now().year)])
    carrera = models.CharField(max_length=100, blank=True, null=True)
    materias= models.ManyToManyField(
        Materia,
        through='Imparte',
        through_fields=('cod_pensum', 'cod_materia'),
    )
    
    class Meta:
        managed = True
        db_table = 'pensum'


