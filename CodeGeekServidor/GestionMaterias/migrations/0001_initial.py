# Generated by Django 3.2.9 on 2021-11-28 03:13

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('GestionLocales', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Catedra',
            fields=[
                ('cod_catedra', models.AutoField(primary_key=True, serialize=False)),
                ('anio', models.BigIntegerField(blank=True, null=True)),
                ('ciclo_par', models.BooleanField(default=False, null=True)),
                ('fecha_inicio', models.DateField()),
                ('fecha_fin', models.DateField()),
            ],
            options={
                'db_table': 'catedra',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Ciclo',
            fields=[
                ('numero_de_ciclo', models.BigIntegerField(primary_key=True, serialize=False)),
                ('anio_en_pensum', models.BigIntegerField(db_column='anio_en_pensum')),
            ],
            options={
                'db_table': 'ciclo',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Dia',
            fields=[
                ('cod_dia', models.BigIntegerField(primary_key=True, serialize=False)),
                ('nombre_dia', models.CharField(max_length=15)),
            ],
            options={
                'db_table': 'dia',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Hora',
            fields=[
                ('cod_hora', models.AutoField(primary_key=True, serialize=False)),
                ('hora_inicio', models.TimeField()),
                ('hora_fin', models.TimeField()),
            ],
            options={
                'db_table': 'hora',
                'managed': True,
                'unique_together': {('hora_inicio', 'hora_fin')},
            },
        ),
        migrations.CreateModel(
            name='Imparte',
            fields=[
                ('numero_de_ciclo', models.IntegerField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'imparte',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Materia',
            fields=[
                ('cod_materia', models.CharField(max_length=6, primary_key=True, serialize=False)),
                ('nombre_materia', models.CharField(max_length=50)),
                ('unidades_valorativas', models.BigIntegerField(blank=True, null=True)),
                ('obligatoria', models.BigIntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'materia',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='RequisitoDe',
            fields=[
                ('mat_cod_materia', models.OneToOneField(db_column='mat_cod_materia', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='GestionMaterias.materia')),
            ],
            options={
                'db_table': 'requisito_de',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Pensum',
            fields=[
                ('cod_pensum', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('anio_publicacion', models.PositiveIntegerField(validators=[django.core.validators.MaxValueValidator(1950), django.core.validators.MinValueValidator(2021)])),
                ('carrera', models.CharField(blank=True, max_length=100, null=True)),
                ('cod_escuela', models.ForeignKey(blank=True, db_column='cod_escuela', null=True, on_delete=django.db.models.deletion.CASCADE, to='GestionLocales.escuela')),
                ('materias', models.ManyToManyField(through='GestionMaterias.Imparte', to='GestionMaterias.Materia')),
            ],
            options={
                'db_table': 'pensum',
                'managed': True,
            },
        ),
        migrations.AddField(
            model_name='imparte',
            name='cod_materia',
            field=models.ForeignKey(db_column='cod_materia', on_delete=django.db.models.deletion.CASCADE, to='GestionMaterias.materia'),
        ),
        migrations.AddField(
            model_name='imparte',
            name='cod_pensum',
            field=models.ForeignKey(db_column='cod_pensum', on_delete=django.db.models.deletion.CASCADE, to='GestionMaterias.pensum'),
        ),
        migrations.CreateModel(
            name='Horario',
            fields=[
                ('cod_horario', models.AutoField(primary_key=True, serialize=False)),
                ('cod_dia', models.ForeignKey(db_column='cod_dia', null=True, on_delete=django.db.models.deletion.CASCADE, to='GestionMaterias.dia')),
                ('cod_hora', models.ForeignKey(db_column='cod_hora', null=True, on_delete=django.db.models.deletion.CASCADE, to='GestionMaterias.hora')),
            ],
            options={
                'db_table': 'horario',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='EsParteDe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coordinador', models.BooleanField(default=False, null=True)),
                ('cod_catedra', models.ForeignKey(db_column='cod_catedra', on_delete=django.db.models.deletion.CASCADE, to='GestionMaterias.catedra')),
            ],
            options={
                'db_table': 'es_parte_de',
                'managed': True,
            },
        ),
    ]
