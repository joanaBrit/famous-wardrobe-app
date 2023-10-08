# Generated by Django 4.2.6 on 2023-10-08 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('garments', '0005_remove_garment_garments_garment_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='garment',
            old_name='image',
            new_name='garments',
        ),
        migrations.AddField(
            model_name='garment',
            name='celebrity_id',
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
    ]
