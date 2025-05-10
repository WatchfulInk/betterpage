from django.db import models

# Create your models here.

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    stock = models.IntegerField()

    def __str__(self):
        return self.nombre_producto

class Servicio(models.Model):
    id_servicio = models.AutoField(primary_key=True)
    nombre_servicio = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre_servicio

class Noticia(models.Model):
    id_noticia = models.AutoField(primary_key=True)
    nombre_noticia = models.CharField(max_length=200)
    fecha = models.DateField()
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre_noticia

class Trabajo(models.Model):
    id_trabajo = models.AutoField(primary_key=True)
    nombre_trabajo = models.CharField(max_length=200)
    fecha_publicacion = models.DateField()
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre_trabajo

class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)
    nombre_venta = models.CharField(max_length=100)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    fecha = models.DateField()

    def __str__(self):
        return self.nombre_venta
