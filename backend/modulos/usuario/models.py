from django.db import models


class Documento(models.Model):
    tipo = models.CharField("Denominacion del tipo de documento", max_length=15)
    estado = models.BooleanField("Estado actual del tipo de documento", default=True)


class Usuario (models.Model):
    numero_ci = models.CharField("Numero de carnet", max_length=10)
    tipo_documento = models.ForeignKey(Documento, related_name="usuario_documento", on_delete=models.PROTECT)
    nombre_completo = models.CharField("Nombre completo del usuario", max_length=50)
    correo_electronico = models.CharField("Correo electronico", max_length=50)
    estado = models.BooleanField("Estado actual del usuario", default=True)
