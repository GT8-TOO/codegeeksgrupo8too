# Generated by Django 3.2.7 on 2021-10-20 00:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('GestionMaterias', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requisitode',
            name='cod_materia',
            field=models.ForeignKey(db_column='cod_materia', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='requisitos', to='GestionMaterias.materia'),
        ),
    ]