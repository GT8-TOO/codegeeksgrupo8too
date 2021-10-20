# Generated by Django 3.2.7 on 2021-10-20 00:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Administrador',
            fields=[
                ('dui', models.BigIntegerField(primary_key=True, serialize=False)),
                ('nit', models.BigIntegerField(blank=True, null=True)),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('apellidos', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'administrador',
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
            ],
            options={
                'db_table': 'docente',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Notificacion',
            fields=[
                ('cod_notificacion', models.BigIntegerField(primary_key=True, serialize=False)),
                ('visto', models.BooleanField(default=False)),
                ('fecha', models.DateField(blank=True, null=True)),
                ('hora', models.DateField(blank=True, null=True)),
                ('titulo', models.CharField(blank=True, max_length=256, null=True)),
            ],
            options={
                'db_table': 'notificacion',
                'managed': True,
            },
        ),
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
    ]
