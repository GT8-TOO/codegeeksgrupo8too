# Generated by Django 3.2.7 on 2021-10-20 00:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Reserva',
            fields=[
                ('cod_reserva', models.AutoField(primary_key=True, serialize=False)),
                ('estado_solicitud', models.CharField(max_length=20)),
                ('fecha_envio', models.DateField(auto_now=True)),
                ('fecha_aprobacion', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'reserva',
                'managed': True,
            },
        ),
    ]
