# Generated by Django 3.2.7 on 2021-10-28 22:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionLocales', '0003_auto_20211022_1417'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagen',
            name='imagen',
            field=models.ImageField(null=True, upload_to='templates/build/static/img'),
        ),
        migrations.AddField(
            model_name='imagen',
            name='url',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]