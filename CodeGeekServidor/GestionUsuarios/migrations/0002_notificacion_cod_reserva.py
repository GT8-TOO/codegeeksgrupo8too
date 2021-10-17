# Generated by Django 3.2.7 on 2021-10-13 03:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('GestionReservas', '0001_initial'),
        ('GestionUsuarios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notificacion',
            name='cod_reserva',
            field=models.ForeignKey(blank=True, db_column='cod_reserva', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='GestionReservas.reserva'),
        ),
    ]