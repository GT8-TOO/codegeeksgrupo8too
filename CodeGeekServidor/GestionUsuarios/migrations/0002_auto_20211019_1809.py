# Generated by Django 3.2.7 on 2021-10-20 00:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('GestionLocales', '0002_auto_20211019_1809'),
        ('GestionReservas', '0002_auto_20211019_1809'),
        ('GestionUsuarios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='administrador',
            name='cod_empleado',
            field=models.ForeignKey(db_column='cod_empleado', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='administrador', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='administrador',
            name='cod_escuela',
            field=models.ForeignKey(db_column='cod_escuela', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='GestionLocales.escuela'),
        ),
        migrations.AddField(
            model_name='docente',
            name='cod_empleado',
            field=models.ForeignKey(db_column='cod_empleado', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='docente', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='docente',
            name='cod_escuela',
            field=models.ForeignKey(db_column='cod_escuela', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='GestionLocales.escuela'),
        ),
        migrations.AddField(
            model_name='notificacion',
            name='cod_empleado',
            field=models.ForeignKey(db_column='cod_empleado', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='notificaciones', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='notificacion',
            name='cod_reserva',
            field=models.ForeignKey(blank=True, db_column='cod_reserva', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='GestionReservas.reserva'),
        ),
    ]