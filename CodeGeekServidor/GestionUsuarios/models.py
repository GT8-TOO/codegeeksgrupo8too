from django.db import models
from GestionLocales.models import Escuela
from GestionLocales.models import Edificio
from django.contrib.auth.models import AbstractUser, BaseUserManager, User
from django.conf import settings
from django.contrib.auth.models import PermissionsMixin
# Create your models here.

class EmpleadoManager(BaseUserManager):
    def create_user(self, email, dui, nombres, password = None):
        if not email:
            raise ValueError('El Usuario debe tener un correo')
        
        empleado=self.model(
            email=self.normalize_email(email),
            dui=dui,
            nombres=nombres,
            password=password
        )

        empleado.set_password(password)
        empleado.save()
        return empleado
    
    def create_superuser(self, email, dui, nombres, password = None):

        empleado=self.create_user(
            email,
            dui=dui,
            nombres=nombres,
            password=password
        )

        empleado.usuario_administrador = True
        empleado.save()
        return empleado


class Empleado(AbstractUser):
          pass
    # codigo_empleado = models.BigIntegerField(primary_key=True, unique=True)
    # email = models.EmailField(max_length=100, blank=True, null=True, unique=True)
    # nombres = models.CharField(max_length=100, blank=True, null=True)
    # apellidos = models.CharField(max_length=100, blank=True, null=True)
    # nit = models.BigIntegerField(blank=True, null=True)
    # cod_escuela = models.ForeignKey('GestionLocales.Escuela', models.DO_NOTHING, db_column='cod_escuela', null=True)
    # estado = models.BooleanField(default=False)
    # objects=EmpleadoManager()

    # USERNAME_FIELD="email"
    # REQUIRED_FIELDS=['nombres', 'dui']

    # def __str__(self):
    #     return f'{self.nombres}.{self.apellidos}'
    
    # def has_perm(self,perm,obj = None):
    #     return True
    
    # def has_module_perms(self,app_label):
    #     return True



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

