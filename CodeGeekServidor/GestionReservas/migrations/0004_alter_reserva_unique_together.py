# Generated by Django 3.2.7 on 2021-11-06 04:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('GestionReservas', '0003_alter_reserva_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='reserva',
            unique_together=set(),
        ),
    ]