from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductoViewSet, ServicioViewSet, NoticiaViewSet,
    TrabajoViewSet, VentaViewSet
)
from .auth_views import login_view, logout_view, user_info

router = DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'noticias', NoticiaViewSet)
router.register(r'trabajos', TrabajoViewSet)
router.register(r'ventas', VentaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', login_view, name='login'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/user/', user_info, name='user-info'),
] 