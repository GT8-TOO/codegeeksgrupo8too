# Generated by Django 3.2.7 on 2021-11-05 19:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('GestionLocales', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('cod_empleado', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('email', models.EmailField(blank=True, max_length=100, null=True, unique=True)),
                ('estado', models.BooleanField(default=False)),
                ('usuario_administrador', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Notificacion',
            fields=[
                ('cod_notificacion', models.AutoField(primary_key=True, serialize=False)),
                ('visto', models.BooleanField(default=False)),
                ('fecha', models.DateField(blank=True, null=True)),
                ('hora', models.TimeField(blank=True, null=True)),
                ('titulo', models.CharField(blank=True, max_length=256, null=True)),
                ('cod_empleado', models.ForeignKey(db_column='cod_empleado', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notificaciones', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'notificacion',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Docente',
            fields=[
                ('dui', models.BigIntegerField(primary_key=True, serialize=False)),
                ('nit', models.BigIntegerField(blank=True, null=True)),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('apellidos', models.CharField(blank=True, max_length=100, null=True)),
                ('fecha_nacimiento', models.DateField(db_column='fecha_nacimiento', null=True)),
                ('cod_empleado', models.ForeignKey(db_column='cod_empleado', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='docente', to=settings.AUTH_USER_MODEL)),
                ('cod_escuela', models.ForeignKey(db_column='cod_escuela', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='GestionLocales.escuela')),
            ],
            options={
                'db_table': 'docente',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Administrador',
            fields=[
                ('dui', models.BigIntegerField(primary_key=True, serialize=False)),
                ('nit', models.BigIntegerField(blank=True, null=True)),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('apellidos', models.CharField(blank=True, max_length=100, null=True)),
                ('fecha_nacimiento', models.DateField(db_column='fecha_nacimiento', null=True)),
                ('cod_empleado', models.ForeignKey(db_column='cod_empleado', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='administrador', to=settings.AUTH_USER_MODEL)),
                ('cod_escuela', models.ForeignKey(db_column='cod_escuela', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='GestionLocales.escuela')),
            ],
            options={
                'db_table': 'administrador',
                'managed': True,
            },
        ),
    ]
