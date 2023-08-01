#!/bin/sh

# Make migrations
python manage.py makemigrations

# Run migrations
python manage.py migrate --no-input

# Run gunicorn
gunicorn core.wsgi:application --bind 0.0.0.0:8000