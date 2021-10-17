# Generated by Django 3.2.7 on 2021-10-17 08:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('GestionUsuarios', '0002_administrador_docente_notificacion'),
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
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Ciclo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('anio_en_pensum', models.BigIntegerField(db_column='anio_en__pensum')),
                ('numero_de_ciclo', models.BigIntegerField()),
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
                ('cod_hora', models.BigIntegerField(primary_key=True, serialize=False)),
                ('hora_inicio', models.DateField()),
                ('hora_fin', models.DateField()),
            ],
            options={
                'db_table': 'hora',
                'managed': True,
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
            name='Pensum',
            fields=[
                ('cod_pensum', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('anio_publicacion', models.DateField()),
                ('carrera', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'pensum',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='RequisitoDe',
            fields=[
                ('mat_cod_materia', models.OneToOneField(db_column='mat_cod_materia', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='GestionMaterias.materia')),
            ],
            options={
                'db_table': 'requisito_de',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='EsParteDe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coordinador', models.BigIntegerField(blank=True, null=True)),
                ('dui', models.ForeignKey(db_column='dui', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='esta_en', to='GestionUsuarios.docente')),
            ],
            options={
                'db_table': 'es_parte_de',
                'managed': True,
            },
        ),
    ]
