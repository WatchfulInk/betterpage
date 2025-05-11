from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Producto, Servicio, Noticia, Trabajo, Venta
from .serializers import (
    ProductoSerializer, ServicioSerializer, NoticiaSerializer,
    TrabajoSerializer, VentaSerializer
)

# Create your views here.

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = [IsAuthenticated]

class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer
    permission_classes = [IsAuthenticated]

class TrabajoViewSet(viewsets.ModelViewSet):
    queryset = Trabajo.objects.all()
    serializer_class = TrabajoSerializer
    permission_classes = [IsAuthenticated]

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
    permission_classes = [IsAuthenticated]
