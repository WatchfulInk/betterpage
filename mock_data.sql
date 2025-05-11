-- Insert mock data for Producto
INSERT INTO betterpage_producto (nombre_producto, precio, descripcion, stock) VALUES
('Laptop HP ProBook', 899.99, 'Laptop empresarial con procesador Intel i5, 8GB RAM, 256GB SSD', 15),
('Monitor Dell 27"', 299.99, 'Monitor LED 27 pulgadas, resolución 1920x1080, HDMI y DisplayPort', 20),
('Teclado Mecánico Logitech', 79.99, 'Teclado mecánico gaming con retroiluminación RGB', 30),
('Mouse Inalámbrico Microsoft', 29.99, 'Mouse inalámbrico ergonómico con batería de larga duración', 50),
('Disco Duro Externo 1TB', 59.99, 'Disco duro externo USB 3.0, 1TB de capacidad', 25);

-- Insert mock data for Servicio
INSERT INTO betterpage_servicio (nombre_servicio, precio, descripcion) VALUES
('Mantenimiento Preventivo', 49.99, 'Revisión y limpieza completa de equipos informáticos'),
('Recuperación de Datos', 199.99, 'Recuperación de datos de discos duros dañados'),
('Instalación de Software', 29.99, 'Instalación y configuración de software empresarial'),
('Consultoría IT', 89.99, 'Asesoramiento en tecnología y sistemas informáticos'),
('Reparación de Hardware', 39.99, 'Diagnóstico y reparación de componentes de PC');

-- Insert mock data for Noticia
INSERT INTO betterpage_noticia (nombre_noticia, fecha, descripcion) VALUES
('Nueva Sede en Madrid', '2024-03-15', 'Ampliamos nuestras instalaciones con una nueva oficina en el centro de Madrid'),
('Lanzamiento de Nuevo Servicio', '2024-03-10', 'Presentamos nuestro nuevo servicio de consultoría cloud'),
('Premio a la Innovación', '2024-02-28', 'Nuestra empresa recibe el premio a la innovación tecnológica'),
('Colaboración con Microsoft', '2024-02-15', 'Firmamos acuerdo de colaboración con Microsoft'),
('Expansión Internacional', '2024-02-01', 'Iniciamos operaciones en Latinoamérica');

-- Insert mock data for Trabajo
INSERT INTO betterpage_trabajo (nombre_trabajo, fecha_publicacion, descripcion) VALUES
('Desarrollador Full Stack', '2024-03-15', 'Buscamos desarrollador con experiencia en React y Django'),
('Administrador de Sistemas', '2024-03-10', 'Vacante para administrador de sistemas Linux y Windows'),
('Diseñador UX/UI', '2024-03-05', 'Se busca diseñador con experiencia en interfaces web'),
('DevOps Engineer', '2024-03-01', 'Posición para ingeniero DevOps con experiencia en AWS'),
('Project Manager', '2024-02-25', 'Buscamos gestor de proyectos con experiencia en metodologías ágiles');

-- Insert mock data for Venta
INSERT INTO betterpage_venta (nombre_venta, producto_id, cantidad, fecha) VALUES
('Venta Corporativa Laptops', 1, 5, '2024-03-15'),
('Venta Monitores Oficina', 2, 8, '2024-03-14'),
('Venta Equipos Gaming', 3, 3, '2024-03-13'),
('Venta Accesorios', 4, 10, '2024-03-12'),
('Venta Almacenamiento', 5, 4, '2024-03-11'); 