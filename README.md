# Proyecto de Conteinerización y Orquestación (Django REST + Angular)

## Descripción general
Este proyecto implementa una aplicación web completa para el registro y gestión de usuarios, desarrollada como parte de un ejercicio práctico de conteinerización y orquestación.

La aplicación está diseñada para demostrar la integración entre Django REST Framework (DRF) y Angular v18, complementada con una base de datos PostgreSQL y un entorno completamente dockerizado preparado para despliegue tanto local como en clústeres Docker Swarm y Kubernetes (KIND).

## Propósito del proyecto
El objetivo principal es aplicar los conocimientos adquiridos sobre contenedores, redes, volúmenes, servicios, orquestación y despliegue en clústeres, mediante la construcción de una aplicación modular, escalable y portable.

Para este fin práctico, el sistema implementa los modelos de:

* **Usuario**, con funcionalidades básicas de registro, listado, actualización y eliminación.
* **TipoDocumento (o Documento)**, que permite asociar tipos o categorías de documento a cada usuario.

Estos modelos exponen más de 6 endpoints REST funcionales, abarcando operaciones CRUD completas (Create, Read, Update, Delete) y demostrando el flujo completo de interacción entre frontend y backend.

## Arquitectura base

La solución está compuesta por los siguientes módulos principales:

| Módulo                                                   | Descripción                                                                                                                                                                   |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend (Django REST Framework + drf-spectacular)**    | API REST desarrollada en Python/Django. Incluye endpoints para gestión de usuarios, documentos y autenticación básica. Documentación automática generada con Swagger y Redoc. |
| **Frontend (Angular v18 + Bootstrap + Bootstrap Icons)** | Interfaz moderna y responsiva. Contiene vistas en pestañas (tabs) para Usuarios y Documentos, formularios con validaciones y consumo de la API mediante `HttpClient`.         |
| **Base de Datos (PostgreSQL)**                           | Motor de base de datos relacional que almacena la información de usuarios y documentos.                                                                                       |
| **Adminer para gestión BD**            | Herramienta ligera de administración de base de datos incluida solo para entornos de prueba y desarrollo.                                                                     |
| **Infraestructura (Docker Compose, Swarm y Kubernetes)** | Permite la ejecución y orquestación de todos los servicios en contenedores, con configuración de redes, volúmenes, variables de entorno y balanceadores de carga.             |

## Componentes Clave y Funcionalidad
El proyecto ofrece:

* API REST estructurada en endpoints de Usuario y Documento (más de 6 endpoints disponibles).
* Documentación interactiva de API con drf-spectacular (`/api/docs/`).
* Frontend Angular con pestañas (Tabs) para la gestión independiente de cada módulo.
* Estilos y componentes visuales basados en Bootstrap 5 y Bootstrap Icons.
* Despliegue completo mediante Docker Compose (local), Docker Swarm (replicado) y Kubernetes KIND (clúster).

## Estructura base del proyecto

```bash
├── backend/               # Proyecto Django REST
│   ├── manage.py
│   ├── registro/          # Configuracion base
│   ├── modulos/           # Aplicaciones (usuarios, documentos, etc.)
│   └── README_BACKEND.md  # Documentación técnica del backend
│
├── frontend/              # Proyecto Angular v18
│   ├── src/
│   └── README_FRONTEND.md # Documentación técnica del frontend
│
├── kind/                  # Archivos de despliegue del maniesto
│   ├── .......            # Manifiestos YAML
│   └── .......
│
├── swarm-stack.yml
├── ........*.yml
├── .gitignore
└── README.md              # Archivo (documentación general)

```

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