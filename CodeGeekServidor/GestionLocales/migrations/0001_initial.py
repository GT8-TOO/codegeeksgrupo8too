# Generated by Django 3.2.7 on 2021-10-12 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Edificio',
            fields=[
                ('cod_edificio', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('nombre_edificio', models.CharField(max_length=50)),
                ('longitud', models.FloatField(blank=True, null=True)),
                ('latitud', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'edificio',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Escuela',
            fields=[
                ('cod_escuela', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('nombre_escuela', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'escuela',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Imagen',
            fields=[
                ('cod_imagen', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('titulo', models.CharField(blank=True, max_length=256, null=True)),
                ('descripcion', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'imagen',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Local',
            fields=[
                ('cod_local', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('nombre_local', models.CharField(max_length=50)),
                ('descripcion', models.CharField(max_length=50)),
                ('nivel', models.BigIntegerField()),
                ('altitud', models.FloatField(blank=True, null=True)),
                ('puntuacion', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'local',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Puntuacion',
            fields=[
                ('dui', models.BigIntegerField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'puntuacion',
                'managed': False,
            },
        ),
    ]
