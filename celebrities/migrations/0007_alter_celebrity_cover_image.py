# Generated by Django 4.2.6 on 2023-10-11 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('celebrities', '0006_remove_celebrity_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='celebrity',
            name='cover_image',
            field=models.URLField(),
        ),
    ]
