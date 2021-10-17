from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.

class Empleado(AbstractUser):
          pass
    
class Administrador(models.Model):
    dui = models.BigIntegerField(primary_key=True)
    cod_emp = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nit = models.BigIntegerField(blank=True, null=True)
    cod_escuela = models.ForeignKey('GestionLocales.Escuela', models.DO_NOTHING, db_column='cod_escuela', null=True)
    

    class Meta:
        managed = True
        db_table = 'administrador'
        
class Docente(models.Model):
    dui = models.BigIntegerField(primary_key=True)
    cod_emp = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nit = models.BigIntegerField(blank=True, null=True)
    cod_escuela = models.ForeignKey('GestionLocales.Escuela', models.DO_NOTHING, db_column='cod_escuela', null=True)
    
    class Meta:
        managed = True
        db_table = 'docente'
       
class Notificacion(models.Model):
    cod_notificacion = models.BigIntegerField(primary_key=True)
    cod_emp = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
   
    cod_reserva = models.ForeignKey('GestionReservas.Reserva', models.DO_NOTHING, db_column='cod_reserva', blank=True, null=True)
    visto = models.BooleanField(default=False,null=False)
    fecha = models.DateField(blank=True, null=True)
    hora = models.DateField(blank=True, null=True)
    titulo = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'notificacion'