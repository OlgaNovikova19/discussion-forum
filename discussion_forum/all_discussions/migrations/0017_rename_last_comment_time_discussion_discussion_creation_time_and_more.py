# Generated by Django 5.1.2 on 2024-10-26 15:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_discussions', '0016_alter_comment_comment_time'),
    ]

    operations = [
        migrations.RenameField(
            model_name='discussion',
            old_name='last_comment_time',
            new_name='discussion_creation_time',
        ),
        migrations.AlterField(
            model_name='comment',
            name='comment_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 10, 26, 17, 49, 56, 851963)),
        ),
    ]
