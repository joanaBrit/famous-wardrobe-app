# Generated by Django 4.2.6 on 2023-10-10 13:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('celebrities', '0005_celebrity_user_alter_celebrity_cover_image_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='celebrity',
            name='user',
        ),
    ]
