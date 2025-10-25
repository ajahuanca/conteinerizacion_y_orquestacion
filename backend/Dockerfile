# ==========================
# Etapa de build
# ==========================
FROM python:3.12-alpine AS build

RUN apk add --no-cache gcc musl-dev libffi-dev postgresql-dev build-base

WORKDIR /app

COPY backend/requirements.txt .

RUN pip install --upgrade pip
RUN pip wheel --wheel-dir=/wheels -r requirements.txt


# ==========================
# Etapa final
# ==========================
FROM python:3.12-alpine

RUN apk add --no-cache libpq

WORKDIR /app

COPY --from=build /wheels /wheels
COPY backend/requirements.txt .

RUN pip install --no-index --find-links=/wheels -r requirements.txt

COPY --chown=appuser:appgroup --chmod=755 backend/entrypoint.sh /entrypoint.sh

COPY backend/ ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=registro.settings

EXPOSE 8000

CMD ["/entrypoint.sh"]
