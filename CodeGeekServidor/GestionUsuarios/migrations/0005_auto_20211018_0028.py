# Generated by Django 3.2.7 on 2021-10-18 06:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionUsuarios', '0004_auto_20211017_0125'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='docente',
            name='fechaNacimiento',
        ),
        migrations.AddField(
            model_name='docente',
            name='fecha_nacimiento',
            field=models.DateField(db_column='fecha_nacimiento', null=True),
        ),
    ]
