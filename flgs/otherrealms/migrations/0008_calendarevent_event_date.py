# Generated by Django 3.2 on 2021-08-20 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('otherrealms', '0007_calendarevent'),
    ]

    operations = [
        migrations.AddField(
            model_name='calendarevent',
            name='event_date',
            field=models.CharField(blank=True, max_length=24),
        ),
    ]