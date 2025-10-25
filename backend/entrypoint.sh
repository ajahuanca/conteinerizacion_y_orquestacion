#!/bin/sh

# EntryPoint para migración la base de datos limpia
# Espera a que la base de datos esté lista
echo "Esperando a que PostgreSQL esté listo..."
while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  sleep 1
done

echo "Aplicando migraciones..."
python manage.py migrate

# Ejecuta Gunicorn
exec gunicorn registro.wsgi:application --bind 0.0.0.0:8000 --workers 3
