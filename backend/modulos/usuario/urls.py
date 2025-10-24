from rest_framework.routers import DefaultRouter
from .views import DocumentoViewSet, UsuarioViewSet


router = DefaultRouter()
router.register('documentos', DocumentoViewSet)
router.register('usuarios', UsuarioViewSet)

urlpatterns = router.urls
