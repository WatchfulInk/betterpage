from django.contrib import admin
from .models import Producto, Servicio, Noticia, Trabajo, Venta

admin.site.register(Producto)
admin.site.register(Servicio)
admin.site.register(Noticia)
admin.site.register(Trabajo)
admin.site.register(Venta)
