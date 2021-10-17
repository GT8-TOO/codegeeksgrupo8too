# Generated by Django 3.2.7 on 2021-10-17 08:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('GestionLocales', '0002_auto_20211017_0220'),
        ('GestionReservas', '0002_auto_20211017_0220'),
        ('GestionUsuarios', '0002_administrador_docente_notificacion'),
    ]

    operations = [
        migrations.AddField(
            model_name='administrador',
            name='cod_escuela',
            field=models.ForeignKey(db_column='cod_escuela', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='GestionLocales.escuela'),
        ),
        migrations.AddField(
            model_name='docente',
            name='cod_escuela',
            field=models.ForeignKey(db_column='cod_escuela', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='GestionLocales.escuela'),
        ),
        migrations.AddField(
            model_name='notificacion',
            name='cod_reserva',
            field=models.ForeignKey(blank=True, db_column='cod_reserva', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='GestionReservas.reserva'),
        ),
    ]
