# Generated by Django 4.2.6 on 2023-10-12 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0003_remove_review_likes_alter_review_user_review_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='title',
            field=models.TextField(default=1, max_length=350),
            preserve_default=False,
        ),
    ]