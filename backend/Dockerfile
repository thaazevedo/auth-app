FROM python:3.8-slim

# Upgrade pip
RUN pip install --upgrade pip

# Install backend requirements
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# Copy app
COPY . /api
WORKDIR /api

# Set entrypoiny file to run migrations, collecstatic and gunicorn
COPY ./entrypoint.sh .
ENTRYPOINT ["sh", "/api/entrypoint.sh"]