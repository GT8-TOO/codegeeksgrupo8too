# Generated by Django 3.2.7 on 2021-10-19 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionMaterias', '0002_auto_20211019_0925'),
    ]

    operations = [
        migrations.AlterField(
            model_name='horario',
            name='cod_horario',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]