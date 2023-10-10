# Generated by Django 4.2.6 on 2023-10-10 11:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('celebrities', '0004_alter_celebrity_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='celebrity',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='celebrities', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='celebrity',
            name='cover_image',
            field=models.ImageField(max_length=200, upload_to=''),
        ),
        migrations.RemoveField(
            model_name='celebrity',
            name='likes',
        ),
        migrations.AddField(
            model_name='celebrity',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_celebrities', to=settings.AUTH_USER_MODEL),
        ),
    ]
