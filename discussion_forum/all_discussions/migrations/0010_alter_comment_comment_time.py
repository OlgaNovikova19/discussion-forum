# Generated by Django 5.1.2 on 2024-10-20 19:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_discussions', '0009_remove_comment_comment_likes_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='comment_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 10, 20, 21, 35, 31, 780415)),
        ),
    ]
