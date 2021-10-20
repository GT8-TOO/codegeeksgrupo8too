from django.db import models
from GestionLocales.models import Escuela
from GestionLocales.models import Edificio
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, User

# Create your models here.

class EmpleadoManager(BaseUserManager):
    def create_user(self, email, password = None):
        if not email:
            raise ValueError('El Usuario debe tener un correo')
        
        empleado=self.model(
            email=self.normalize_email(email),
            password=password
        )

        empleado.set_password(password)
        empleado.save()
        return empleado
    
    def create_superuser(self, email, password = None):

        empleado=self.create_user(
            email=self.normalize_email(email),
            
            password=password
        )

        empleado.usuario_administrador = True
        empleado.save()
        return empleado


class Empleado(AbstractBaseUser):
    cod_empleado = models.AutoField(primary_key=True, unique=True)
    email = models.EmailField(max_length=100, blank=True, null=True, unique=True)
    
    estado = models.BooleanField(default=False)
    usuario_administrador = models.BooleanField(default=False)
    objects=EmpleadoManager()

    USERNAME_FIELD="email"

    def __str__(self):
        return f'{self.email}'
    
    def has_perm(self,perm,obj = None):
        return True
    
    def has_module_perms(self,app_label):
        return True

    @property
    def is_staff(self):
        return self.usuario_administrador    
    


class Administrador(models.Model):
    dui = models.BigIntegerField(primary_key=True)
    cod_empleado = models.ForeignKey('GestionUsuarios.Empleado', models.CASCADE, db_column='cod_empleado',related_name='administrador', null=True)
    cod_escuela = models.ForeignKey('GestionLocales.Escuela', models.DO_NOTHING, db_column='cod_escuela',null=True)
    nit = models.BigIntegerField(blank=True, null=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, blank=True, null=True)
    fecha_nacimiento = models.DateField(db_column='fecha_nacimiento', null=True)

    class Meta:
        managed = True
        db_table = 'administrador'
    
    def __str__(self):
        return f'{self.nombre}'

class Docente(models.Model):
    dui = models.BigIntegerField(primary_key=True)
    cod_empleado = models.ForeignKey('GestionUsuarios.Empleado', models.DO_NOTHING, db_column='cod_empleado',related_name='docente', null=True)
    cod_escuela = models.ForeignKey('GestionLocales.Escuela', models.DO_NOTHING, db_column='cod_escuela', null=True)
    nit = models.BigIntegerField(blank=True, null=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, blank=True, null=True)
    fecha_nacimiento = models.DateField(db_column='fecha_nacimiento', null=True)

    class Meta:
        managed = True
        db_table = 'docente'

    def __str__(self):
        return f'{self.nombre}'

class Notificacion(models.Model):
    cod_notificacion = models.BigIntegerField(primary_key=True)
    cod_empleado = models.ForeignKey('GestionUsuarios.Empleado', models.DO_NOTHING, db_column='cod_empleado',related_name='notificaciones',null=True)
    cod_reserva = models.ForeignKey('GestionReservas.Reserva', models.DO_NOTHING, db_column='cod_reserva', blank=True, null=True)
    visto = models.BooleanField(null=False,default=False)
    fecha = models.DateField(blank=True, null=True)
    hora = models.DateField(blank=True, null=True)
    titulo = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'notificacion'

