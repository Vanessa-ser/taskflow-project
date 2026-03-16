Problemas de Programación Lógica
    · Experimento 1: Validador de formularios
        Problema: Crear una función que verifique si el input de "producto" está vacío o tiene menos de 3 caracteres antes de añadirlo a la lista.

        Sin IA: Tardé unos 10 minutos. Tuve que recordar la propiedad .trim().length y escribir el if/else con el alert.

        Con IA: 15 segundos usando Ctrl + K. Generó una validación más limpia con una clase de borde rojo en Tailwind para el error.

        Conclusión: La IA es imbatible en sintaxis de validación rápida.

    · Experimento 2: Formateador de moneda (Euros)
        - Problema: Una función que reciba un número y devuelva el texto con el símbolo € al final y dos decimales.

        - Sin IA: 5 minutos. Usé concatenación básica: precio + "€".

        - Con IA: Segundos. Utilizó Intl.NumberFormat, que es mucho más profesional y maneja mejor los decimales en español.

        - Conclusión: La IA aporta "mejores prácticas" que a veces olvidamos por las prisas.

    · Experimento 3: Filtro de búsqueda en array
        - Problema: Filtrar una lista de objetos por nombre.

        - Sin IA: 15 minutos. Me lié un poco con el .filter() y el .includes().

        - Con IA: Instantáneo. Escribió el filtro y añadió .toLowerCase() para que la búsqueda no fallara con mayúsculas.

        - Conclusión: La IA evita errores comunes de lógica sencilla.

Relacionadas con tu proyecto:

    · Tarea 1: Alternar iconos del Modo Oscuro
        -Problema: Cambiar el texto/icono del botón de "Modo Día" a "Modo Noche" dinámicamente.

        -Sin IA: Tuve que buscar cómo se usaba classList.contains. Me llevó un rato probar que el texto cambiara al mismo tiempo que el fondo.

        -Con IA: Con Ctrl + L le pedí: "Haz que el botón cambie de Sol a Luna". Lo hizo a la primera y añadió una transición suave.

        -Diferencia: Ganancia de tiempo del 80%.

    Tarea 2: Cálculo de promoción "2ª tarta al 50%"
        -Problema: Crear un pequeño script que calcule el descuento si el usuario selecciona dos tartas.

        -Sin IA: Un poco complejo de plantear de primeras sin fallar en los cálculos matemáticos.

        -Con IA: Le di los precios y generó la lógica de descuento en segundos.

        -Diferencia: La comprensión del problema fue mutua; la IA estructuró la lógica mejor que mi borrador inicial.

    · Tarea 3: Efecto de scroll suave en el menú
        -Problema: Que al pulsar "CONTACTO" la página baje suavemente pero se detenga un poco antes para no tapar el título.

        -Sin IA: Sabía usar scroll-behavior: smooth en CSS, pero no cómo calcular el offset (margen) con JavaScript.

        -Con IA: Me dio el código exacto con window.scrollTo restando 70 píxeles a la posición del destino.

        -Diferencia: Calidad de código muy superior. Lo que a mí me hubiera llevado media hora de pruebas, la IA lo resolvió en un minuto.