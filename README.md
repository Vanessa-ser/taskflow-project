# Taskflow Project
Es una web de pastelería/cafetería (“La Esquina”) hecha con HTML + Tailwind (via CDN) + JS, que funciona como información de la empresa, carta online y pequeño sistema de pedidos.

En la parte visual muestra secciones de sobre nosotros, carta (bebidas, dulces, salados, tartas), promociones, horarios y contacto, con modo claro/oscuro y diseño adaptado a móvil.
En la parte interactiva tienes una lista de pedido donde el cliente puede buscar productos de la carta con autocompletado, añadirlos, ver y modificar cantidades con botones + y −, ver el precio por producto y el total del carrito.
Además se aplica automáticamente la promoción de tartas (segunda a mitad de precio), se guarda la lista en localStorage para que no se pierda al recargar, y se muestran mensajes de validación claros cuando se añade un producto o hay errores.

Características Principales
* Diseño Elegante y Responsive:** Interfaz construida con Tailwind CSS, adaptada para móviles y escritorio.
* Modo Oscuro/Noche: Interruptor de tema personalizado para mejorar la experiencia visual.
* Gestor de Pedidos: Formulario dinámico para añadir productos a una lista de futura compra.
* Carta Digital: Visualización de productos categorizados (Dulces, Salados, Bebidas, Tartas).

Tecnologías Utilizadas
* HTML5 & CSS3 (Estructura y diseño base).
* Tailwind CSS (Framework de estilos mediante CDN).
* JavaScript (Vanilla) (Lógica de interactividad y manipulación del DOM).
* Cursor AI & MCP (Desarrollo asistido y gestión de archivos).

Ejemplos de Uso
 Cómo añadir un producto a la lista:
1. Navega hasta la sección "Lista de productos para futura compra"**.
2. Escribe el nombre del dulce (ej: "Croissant de pistacho").
3. Pulsa el botón . El producto aparecerá instantáneamente en el grid inferior.

Cambio de tema:
Pulsa el botón flotante en la esquina superior derecha para alternar entre el modo día y el modo noche. La preferencia se guardará automáticamente en tu navegador.