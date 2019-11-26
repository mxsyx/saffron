# Generated by Django 2.1.1 on 2019-07-28 02:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Anime',
            fields=[
                ('id', models.IntegerField(db_column='ID', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='NAME', max_length=80, unique=True)),
                ('introduction', models.TextField(blank=True, db_column='INTRODUCTION', null=True)),
                ('director', models.CharField(blank=True, db_column='DIRECTOR', max_length=60, null=True)),
                ('actor', models.TextField(blank=True, db_column='ACTOR', null=True)),
                ('flag_time', models.CharField(blank=True, db_column='FLAG_TIME', max_length=4, null=True)),
                ('flag_area', models.CharField(blank=True, db_column='FLAG_AREA', max_length=8, null=True)),
                ('flag_type', models.CharField(blank=True, db_column='FLAG_TYPE', max_length=20, null=True)),
                ('score', models.FloatField(blank=True, db_column='SCORE', null=True)),
                ('url_img', models.TextField(blank=True, db_column='URL_IMG', null=True)),
                ('update_time', models.DateField(db_column='UPDATE_TIME')),
            ],
            options={
                'db_table': 'anime',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
            ],
            options={
                'db_table': 'auth_group',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroupPermissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_group_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('codename', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'auth_permission',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.IntegerField()),
                ('username', models.CharField(max_length=150, unique=True)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=150)),
                ('email', models.CharField(max_length=254)),
                ('is_staff', models.IntegerField()),
                ('is_active', models.IntegerField()),
                ('date_joined', models.DateTimeField()),
            ],
            options={
                'db_table': 'auth_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserGroups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_user_groups',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserUserPermissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_user_user_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Begfilm',
            fields=[
                ('id', models.AutoField(db_column='ID', primary_key=True, serialize=False)),
                ('ip', models.CharField(db_column='IP', max_length=15)),
                ('ttime', models.DateTimeField(db_column='TTIME')),
                ('content', models.TextField(db_column='CONTENT')),
            ],
            options={
                'db_table': 'begfilm',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Carousel',
            fields=[
                ('id', models.IntegerField(db_column='ID', primary_key=True, serialize=False)),
                ('url', models.TextField(db_column='URL')),
                ('name', models.CharField(db_column='NAME', max_length=60)),
            ],
            options={
                'db_table': 'carousel',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoAdminLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_time', models.DateTimeField()),
                ('object_id', models.TextField(blank=True, null=True)),
                ('object_repr', models.CharField(max_length=200)),
                ('action_flag', models.PositiveSmallIntegerField()),
                ('change_message', models.TextField()),
            ],
            options={
                'db_table': 'django_admin_log',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoContentType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_label', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'django_content_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoMigrations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('applied', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_migrations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoSession',
            fields=[
                ('session_key', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('session_data', models.TextField()),
                ('expire_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_session',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(db_column='ID', primary_key=True, serialize=False)),
                ('ip', models.CharField(db_column='IP', max_length=15)),
                ('ttime', models.DateTimeField(db_column='TTIME')),
                ('url', models.CharField(db_column='URL', max_length=60)),
                ('content', models.TextField(db_column='CONTENT')),
                ('email', models.CharField(db_column='EMAIL', max_length=255)),
            ],
            options={
                'db_table': 'feedback',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.IntegerField(db_column='ID', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='NAME', max_length=80, unique=True)),
                ('introduction', models.TextField(blank=True, db_column='INTRODUCTION', null=True)),
                ('director', models.CharField(blank=True, db_column='DIRECTOR', max_length=60, null=True)),
                ('actor', models.TextField(blank=True, db_column='ACTOR', null=True)),
                ('flag_time', models.CharField(blank=True, db_column='FLAG_TIME', max_length=4, null=True)),
                ('flag_area', models.CharField(blank=True, db_column='FLAG_AREA', max_length=8, null=True)),
                ('flag_type', models.CharField(blank=True, db_column='FLAG_TYPE', max_length=20, null=True)),
                ('score', models.FloatField(blank=True, db_column='SCORE', null=True)),
                ('url_img', models.TextField(blank=True, db_column='URL_IMG', null=True)),
                ('update_time', models.DateField(db_column='UPDATE_TIME')),
                ('url', models.TextField(blank=True, db_column='URL', null=True)),
            ],
            options={
                'db_table': 'movie',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Ranking',
            fields=[
                ('vid', models.CharField(db_column='VID', max_length=8, primary_key=True, serialize=False)),
                ('rday', models.IntegerField(blank=True, db_column='RDAY', null=True)),
                ('rweek', models.IntegerField(blank=True, db_column='RWEEK', null=True)),
                ('rmonth', models.IntegerField(blank=True, db_column='RMONTH', null=True)),
            ],
            options={
                'db_table': 'ranking',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Tvseries',
            fields=[
                ('id', models.IntegerField(db_column='ID', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='NAME', max_length=80, unique=True)),
                ('introduction', models.TextField(blank=True, db_column='INTRODUCTION', null=True)),
                ('director', models.CharField(blank=True, db_column='DIRECTOR', max_length=60, null=True)),
                ('actor', models.TextField(blank=True, db_column='ACTOR', null=True)),
                ('flag_time', models.CharField(blank=True, db_column='FLAG_TIME', max_length=4, null=True)),
                ('flag_area', models.CharField(blank=True, db_column='FLAG_AREA', max_length=8, null=True)),
                ('flag_type', models.CharField(blank=True, db_column='FLAG_TYPE', max_length=20, null=True)),
                ('score', models.FloatField(blank=True, db_column='SCORE', null=True)),
                ('url_img', models.TextField(blank=True, db_column='URL_IMG', null=True)),
                ('update_time', models.DateField(db_column='UPDATE_TIME')),
            ],
            options={
                'db_table': 'tvseries',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UAnime',
            fields=[
                ('vid', models.IntegerField(db_column='VID', primary_key=True, serialize=False)),
                ('num', models.PositiveSmallIntegerField(db_column='NUM')),
                ('url', models.TextField(blank=True, db_column='URL', null=True)),
            ],
            options={
                'db_table': 'u_anime',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UTvseries',
            fields=[
                ('vid', models.IntegerField(db_column='VID', primary_key=True, serialize=False)),
                ('num', models.PositiveSmallIntegerField(db_column='NUM')),
                ('url', models.TextField(blank=True, db_column='URL', null=True)),
            ],
            options={
                'db_table': 'u_tvseries',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UVariety',
            fields=[
                ('vid', models.IntegerField(db_column='VID', primary_key=True, serialize=False)),
                ('num', models.PositiveSmallIntegerField(db_column='NUM')),
                ('url', models.TextField(blank=True, db_column='URL', null=True)),
            ],
            options={
                'db_table': 'u_variety',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Variety',
            fields=[
                ('id', models.IntegerField(db_column='ID', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='NAME', max_length=80, unique=True)),
                ('introduction', models.TextField(blank=True, db_column='INTRODUCTION', null=True)),
                ('director', models.CharField(blank=True, db_column='DIRECTOR', max_length=60, null=True)),
                ('actor', models.TextField(blank=True, db_column='ACTOR', null=True)),
                ('flag_time', models.CharField(blank=True, db_column='FLAG_TIME', max_length=4, null=True)),
                ('flag_area', models.CharField(blank=True, db_column='FLAG_AREA', max_length=8, null=True)),
                ('flag_type', models.CharField(blank=True, db_column='FLAG_TYPE', max_length=20, null=True)),
                ('score', models.FloatField(blank=True, db_column='SCORE', null=True)),
                ('url_img', models.TextField(blank=True, db_column='URL_IMG', null=True)),
                ('update_time', models.DateField(db_column='UPDATE_TIME')),
            ],
            options={
                'db_table': 'variety',
                'managed': False,
            },
        ),
    ]
