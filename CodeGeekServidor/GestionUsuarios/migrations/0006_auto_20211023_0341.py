# Generated by Django 3.2.7 on 2021-10-23 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionUsuarios', '0005_alter_notificacion_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notificacion',
            name='fecha',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='notificacion',
            name='hora',
            field=models.TimeField(blank=True, null=True),
        ),
    ]