from rest_framework import serializers
from .models import Documento, Usuario


class DocumentoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Documento
        fields = [
            'id', 'tipo', 'estado',
        ]


class UsuarioSerializer(serializers.ModelSerializer):
    tipo_documento_id = serializers.IntegerField()
    tipo_documento = DocumentoSerializers(read_only=True)

    class Meta:
        model = Usuario
        fields = [
            'id', 'numero_ci', 'tipo_documento', 'tipo_documento_id', 
            'nombre_completo', 'correo_electronico', 'estado',
        ]
