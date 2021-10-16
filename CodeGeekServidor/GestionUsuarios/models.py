from django.db import models
from GestionLocales.models import Escuela
from GestionLocales.models import Edificio
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, User

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


class Empleado(AbstractBaseUser):
    email = models.EmailField(max_length=100, blank=True, null=True, unique=True)
    dui = models.BigIntegerField(primary_key=True, unique=True)
    nit = models.BigIntegerField(blank=True, null=True)
    nombres = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, blank=True, null=True)
    fechaNacimiento = models.DateField(null=True)
    estado = models.BooleanField(default=True)
    usuario_administrador = models.BooleanField(default=False)
    objects=EmpleadoManager()

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=['nombres', 'dui']

    def __str__(self):
        return f'{self.nombres}.{self.apellidos}'
    
    def has_perm(self,perm,obj = None):
        return True
    
    def has_module_perms(self,app_label):
        return True

    @property
    def is_staff(self):
        return self.usuario_administrador    


class Administrador(models.Model):
    dui = models.BigIntegerField(primary_key=True)
    emp_dui = models.BigIntegerField()
    cod_escuela = models.ForeignKey('GestionLocales.Escuela', models.DO_NOTHING, db_column='cod_escuela')
    nit = models.BigIntegerField(blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    password = models.CharField(max_length=256, blank=True, null=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, blank=True, null=True)
    codigo_administrador = models.CharField(max_length=20)

    class Meta:
        managed = True
        db_table = 'administrador'
        unique_together = (('dui', 'emp_dui'),)

class Docente(models.Model):
    dui = models.BigIntegerField(primary_key=True)
    cod_escuela = models.ForeignKey('GestionLocales.Escuela', models.DO_NOTHING, db_column='cod_escuela', null=True)
    nit = models.BigIntegerField(blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    password = models.CharField(max_length=256, blank=True, null=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, blank=True, null=True)
    emp_dui = models.BigIntegerField()
    estado = models.CharField(max_length=20)
    codigo_docente = models.CharField(max_length=20)

    class Meta:
        managed = True
        db_table = 'docente'
        unique_together = (('dui', 'emp_dui'),)

class Notificacion(models.Model):
    cod_notificacion = models.BigIntegerField(primary_key=True)
    dui = models.BigIntegerField(blank=True, null=True)
    cod_reserva = models.ForeignKey('GestionReservas.Reserva', models.DO_NOTHING, db_column='cod_reserva', blank=True, null=True)
    visto = models.BigIntegerField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    hora = models.DateField(blank=True, null=True)
    titulo = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'notificacion'

