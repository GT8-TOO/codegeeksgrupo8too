# Generated by Django 3.2.7 on 2021-10-13 02:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('GestionUsuarios', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Catedra',
            fields=[
                ('cod_catedra', models.BigIntegerField(primary_key=True, serialize=False)),
                ('anio', models.BigIntegerField(blank=True, null=True)),
                ('ciclo_par', models.BigIntegerField(blank=True, null=True)),
                ('fecha_inicio', models.DateField()),
                ('fecha_fin', models.DateField()),
            ],
            options={
                'db_table': 'catedra',
                'managed': False,
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
            name='EsParteDe',
            fields=[
                ('dui', models.OneToOneField(db_column='dui', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='GestionUsuarios.docente')),
                ('coordinador', models.BigIntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'es_parte_de',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Hora',
            fields=[
                ('cod_hora', models.BigIntegerField(primary_key=True, serialize=False)),
                ('hora_inicio', models.DateField()),
                ('hora_fin', models.DateField()),
            ],
            options={
                'db_table': 'hora',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Horario',
            fields=[
                ('cod_horario', models.BigIntegerField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'horario',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Imparte',
            fields=[
                ('numero_de_ciclo', models.BigIntegerField(primary_key=True, serialize=False)),
                ('cod_pensum', models.CharField(max_length=10)),
                ('ciclo_par', models.BigIntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'imparte',
                'managed': False,
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
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Pensum',
            fields=[
                ('cod_pensum', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('anio_publicacion', models.DateField()),
                ('carrera', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'pensum',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Ciclo',
            fields=[
                ('anio_en_pensum', models.BigIntegerField(db_column='anio_en__pensum')),
                ('numero_de_ciclo', models.BigIntegerField()),
                ('cod_pensum', models.OneToOneField(db_column='cod_pensum', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='GestionMaterias.pensum')),
            ],
            options={
                'db_table': 'ciclo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='RequisitoDe',
            fields=[
                ('mat_cod_materia', models.OneToOneField(db_column='mat_cod_materia', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='GestionMaterias.materia')),
            ],
            options={
                'db_table': 'requisito_de',
                'managed': False,
            },
        ),
    ]