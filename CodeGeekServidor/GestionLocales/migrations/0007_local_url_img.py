# Generated by Django 3.2.7 on 2021-10-29 01:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GestionLocales', '0006_auto_20211028_1634'),
    ]

    operations = [
        migrations.AddField(
            model_name='local',
            name='url_img',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
