# Generated by Django 5.1.2 on 2024-10-23 20:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_discussions', '0015_alter_comment_comment_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='comment_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 10, 23, 22, 5, 6, 309941)),
        ),
    ]