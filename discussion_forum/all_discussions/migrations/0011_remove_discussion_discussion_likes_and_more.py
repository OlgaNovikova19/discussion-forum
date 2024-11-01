# Generated by Django 5.1.2 on 2024-10-21 13:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_discussions', '0010_alter_comment_comment_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='discussion',
            name='discussion_likes',
        ),
        migrations.AddField(
            model_name='discussion',
            name='discussion_reactions',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='comment',
            name='comment_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 10, 21, 15, 58, 38, 931136)),
        ),
    ]
