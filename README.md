# Proyecto de Conteinerización y Orquestación (Django REST + Angular)

## Descripción
Aplicación de Registro de usuarios con:
- Backend: Django REST (DRF + drf-spectacular)
- Frontend: Angular v18
- Base de datos: PostgreSQL
- Adminer para gestión BD (dev)
Se puede ejecutar localmente con Docker Compose, desplegar en Docker Swarm y en Kubernetes (KIND).

## Arquitectura
(Dibuja un diagrama simple: Frontend <-> Nginx -> Backend -> Postgres; Backend <-> Redis; Backend -> Celery -> Redis)

## Requisitos previos
- Docker (>=20)
- docker-compose (v2)
- docker swarm (para Swarm)
- kind (para cluster Kubernetes local)
- kubectl
- MetalLB y ingress-nginx para KIND

## 1) Desarrollo local (Docker Compose)
1. Copiar `.env` con variables sensibles:
   ```env
   POSTGRES_DB=appdb
   POSTGRES_USER=appuser
   POSTGRES_PASSWORD=apppassword
   SECRET_KEY=dev-secret
   DEBUG=1
   ```

2. Levantar docker compose
   ```
   docker-compose up --build
   ```
3. Acceder a las rutas para verificar las aplicaciones
   * Frontend: http://localhost:8080
   * Backend: http://localhost:8000
   * Adminer: http://localhost:8081

## 2) Docker Swarm

1. Inicializamos Swarm
   ```
   docker swarm init
   ```
2. Creamos los secretos
   ```
   echo "apppassword" | docker secret create pg_password -
   echo "django_secret_key" | docker secret create django_secret_key -
   ```
3. Ahora subimos el Stack
   ```
   docker stack deploy -c stack-deploy.yml appstack
   ```
4. Visualizamos los servicios
   ```
   docker stack ps appstack
   docker service ls
   ```

## 3) Kubernetes (KIND, conforme la lista designada)

1. Creamos el cluster con KIND:
   ```
   kind create cluster --name app-cluster
   kubectl create namespace app-registro
   ```
2. Se recomienda instalar MetalLB para LoadBalancer en KIND:

   * Siguir la guía oficial MetalLB; 
   * luego crear IP pool.

3. Ahora aplicamos los manifests:
   ```
   kubectl apply -f k8s/namespace-config.yaml
   kubectl apply -f k8s/postgres-deployment.yaml
   kubectl apply -f k8s/deployment-backend.yaml
   kubectl apply -f k8s/deployment-frontend.yaml
   ```
4. Revisamos
   ```
   kubectl get pods -n app-registro
   kubectl get svc -n app-registro
   ```

## Buenas prácticas implementadas

* Dockerfiles optimizados en varias etapas.
* Imágenes base ligeras (alpine) por temas de practicidad.
* Variables de entorno y secretos (Docker secrets y Kubernetes Secrets).
* Volúmenes persistentes para Postgres.
* Red personalizada en Docker Compose y Swarm (overlay).
* Versionamiento de imágenes: registro/backend:1.0.0, registro/frontend:1.0.0.