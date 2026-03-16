Este documento describe cómo se utiliza Cursor dentro del flujo de trabajo del proyecto.

Primer contacto con Cursor y refactorización Taskflow
    ·Mejora en la lista de carrito:
        - Antes tenias que poner exactamente el producto para poder añadirlo a la lista.
            Ahora en el momento que escribes la primera letra ya te aparecen las opciones de los productos que empiezan con esas letras y puedes elegir.
        - Tambien ha añadido el precio de cada producto en la lista de la compra y el total de lo que 
          llevas añadido.
        -Por ultimo, ya habia puesto que una de las promociones fuese que el precio de la segunda tarta   
          comprada estaba a mitad de precio.
          He hecho que este descuento aparezca en el total junto con un mensaje de que esa promoción está aplicada.

        - Por otro lado, he añadido una validación donde confirma que el producto se ha añadido correcatemnte.

He simplificado funciones largas y repetitivas:
  · normalizarTexto(texto): hace trim().toLowerCase() en un solo sitio.
  ·existeEnCarta(nombre): comprueba si un producto está en productosCarta usando normalizarTexto.
  buscarProductoEnLista(nombre): busca en productos un producto por nombre, también normalizado.
  ·calcularDescuentoTartas(precioUnitario, cantidad, nombre): calcula cuánto descuento aplica la ·promo de “segunda tarta a mitad de precio” para un producto concreto.
He centralizado la lista de tartas en promoción:
  ·Antes se creaba un array dentro de renderizarProductos cada vez.
  ·Ahora hay un Set global tartasPromo con los nombres de las tartas en promo, y   
    calcularDescuentoTartas lo usa.
He limpiado renderizarProductos:
  ·Quité la lógica repetida de promo y la reemplacé por la llamada a calcularDescuentoTartas.
  ·Dejé más claro el flujo: calcular totalBruto, acumular descuentoTartas, renderizar lista, actualizar total y mostrar/ocultar el mensaje de promoción.
Simplifiqué el autocompletado y el submit:
  ·El input de autocompletado ahora usa normalizarTexto en vez de repetir toLowerCase y trim.
  ·El submit del formulario usa existeEnCarta y buscarProductoEnLista, haciendo el bloque más corto y fácil de leer, pero sin cambiar el comportamiento que ya tenías.

- Implementación de Model Context Protocol (MCP)

MCP
Proceso de Instalación Paso a Paso
- Entré en Settings > Tools & MCP.
- Pulsé en Add Custom MCP y se abrió el archivo mcp.json.
    Servidor Filesystem: Añadí el servidor de sistema de archivos de Anthropic configurando el comando npx, el paquete @modelcontextprotocol/server-filesystem y la ruta absoluta de mi proyecto en el escritorio.
    Validación: Tras guardar el archivo, verifiqué que en el panel de herramientas aparecía el servidor con el indicador en color verde, confirmando la conexión.

Utilicé el servidor MCP para realizar las siguientes acciones desde el chat:

  - Listado de archivos: Le pedí que me diera la estructura completa de carpetas del proyecto para ver si detectaba archivos ocultos.

  - Auditoría de imágenes: Verifiqué si todas las imágenes llamadas en el index.html existían realmente en la carpeta /Imagenes.

  - Análisis de estilos: Pedí un resumen de todos los colores hexadecimales usados en las clases de Tailwind del proyecto.

  - Verificación de dependencias: Le pregunté si faltaba algún archivo .js mencionado en el HTML que no estuviera físicamente en la carpeta.

  - Generación de reporte: Ordené a la IA crear un archivo de texto (resultado_mcp.txt) con un resumen técnico de los avances del proyecto.


El uso de MCP es fundamental en entornos profesionales
  - Escalabilidad: Permite trabajar en proyectos con miles de archivos donde es imposible copiar y pegar contexto manualmente.

  - Precisión: La IA puede consultar bases de datos reales o esquemas de archivos sin errores de interpretación.

  - Automatización: Facilita tareas como la limpieza de código muerto, la generación automática de documentación técnica o la auditoría de seguridad de archivos en tiempo real.