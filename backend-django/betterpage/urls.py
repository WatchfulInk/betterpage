from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductoViewSet, ServicioViewSet, NoticiaViewSet,
    TrabajoViewSet, VentaViewSet
)

router = DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'noticias', NoticiaViewSet)
router.register(r'trabajos', TrabajoViewSet)
router.register(r'ventas', VentaViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 