from rest_framework import viewsets, permissions
from .models import Documento, Usuario
from .serializers import DocumentoSerializers, UsuarioSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(
    summary="CRUD de Documentos",
    description="Lista, crea, actualiza y elimina documentos asociados a usuarios",
    tags=['Tipo de documento']
)
class DocumentoViewSet(viewsets.ModelViewSet):
    queryset = Documento.objects.all().order_by('-id')
    serializer_class = DocumentoSerializers
    permission_classes = [permissions.AllowAny]


@extend_schema(
    summary="CRUD de Usuarios",
    description="Lista, crea, actualiza y elimina usuarios del sistema",
    tags=['Usuarios']
)
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all().order_by('-id')
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.AllowAny]
