const productosCarta = [
    "Café de especialidad filtrado",
    "Espresso doble / Macchiato",
    "Cold Brew infusionado",
    "Matcha latte o Golden latte",
    "Té chai latte",
    "Té helado de autor",
    "Croissant de mantequilla",
    "Croissant relleno (chocolate blanco/nutella/pistacho)",
    "Napolitana de chocolate o crema",
    "Ensaimada",
    "Rollito de canela",
    "Brioche relleno de crema",
    "Tostada de aguacate, huevo poché y semillas",
    "Bagel de salmón ahumado, queso crema y eneldo",
    "Focaccia de mortadela italiana, burrata y pistacho",
    "Empanadilla de atún",
    "Tostada caprese (mozzarella, tomate y pesto)",
    "Wrap de pollo estilo César",
    "Cheesecake de frutos rojos u Oreo",
    "Tarta de zanahoria y crema de queso",
    "Brownie de chocolate con nueces",
    "Tarta de limón y merengue",
    "Carrot & Matcha Layer Cake",
    "Tarta de queso japonés"
];

// Precios por producto (por ración)
const preciosCarta = {
    "Café de especialidad filtrado": 4.0,
    "Espresso doble / Macchiato": 2.7,
    "Cold Brew infusionado": 4.5,
    "Matcha latte o Golden latte": 4.5,
    "Té chai latte": 4.5,
    "Té helado de autor": 4.0,
    "Croissant de mantequilla": 3.0,
    "Croissant relleno (chocolate blanco/nutella/pistacho)": 4.5,
    "Napolitana de chocolate o crema": 2.5,
    "Ensaimada": 3.5,
    "Rollito de canela": 3.0,
    "Brioche relleno de crema": 4.0,
    "Tostada de aguacate, huevo poché y semillas": 8.5,
    "Bagel de salmón ahumado, queso crema y eneldo": 7.9,
    "Focaccia de mortadela italiana, burrata y pistacho": 8.9,
    "Empanadilla de atún": 3.5,
    "Tostada caprese (mozzarella, tomate y pesto)": 6.5,
    "Wrap de pollo estilo César": 7.5,
    "Cheesecake de frutos rojos u Oreo": 4.5,
    "Tarta de zanahoria y crema de queso": 4.0,
    "Brownie de chocolate con nueces": 3.5,
    "Tarta de limón y merengue": 4.5,
    "Carrot & Matcha Layer Cake": 5.0,
    "Tarta de queso japonés": 4.5
};

// Seleccionamos los elementos del DOM
const formulario = document.getElementById("formulario-producto");
const inputProducto = document.getElementById("input-producto");
const listaUl = document.getElementById("lista-productos");
const totalCarritoSpan = document.getElementById("total-carrito");
const promoTartasMsg = document.getElementById("promo-tartas-msg");
const sugerenciasUl = document.getElementById("sugerencias-producto");
const mensajeEstadoProducto = document.getElementById("mensaje-estado-producto");

let productos = [];

const tartasPromo = new Set([
    "Cheesecake de frutos rojos u Oreo",
    "Tarta de zanahoria y crema de queso",
    "Brownie de chocolate con nueces",
    "Tarta de limón y merengue",
    "Carrot & Matcha Layer Cake",
    "Tarta de queso japonés"
]);

/**
 * Normaliza un texto eliminando espacios en blanco al inicio y final
 * y convirtiéndolo a minúsculas para comparaciones consistentes.
 * @param {string} texto - Texto original introducido por el usuario o definido en la carta.
 * @returns {string} Texto normalizado en minúsculas y sin espacios extremos.
 */
function normalizarTexto(texto) {
    return texto.trim().toLowerCase();
}

/**
 * Comprueba si un producto existe en la carta oficial.
 * La comparación se hace de forma insensible a mayúsculas/minúsculas y espacios extremos.
 * @param {string} nombre - Nombre del producto a comprobar.
 * @returns {boolean} `true` si el producto está en `productosCarta`, `false` en caso contrario.
 */
function existeEnCarta(nombre) {
    const buscado = normalizarTexto(nombre);
    return productosCarta.some((p) => normalizarTexto(p) === buscado);
}

/**
 * Busca un producto ya añadido en la lista de compra.
 * @param {string} nombre - Nombre del producto que se quiere localizar en la lista.
 * @returns {{nombre: string, cantidad: number} | undefined} El producto encontrado o `undefined` si no existe.
 */
function buscarProductoEnLista(nombre) {
    const buscado = normalizarTexto(nombre);
    return productos.find((p) => normalizarTexto(p.nombre) === buscado);
}

/**
 * Muestra un mensaje de estado debajo del campo de entrada para informar al cliente.
 * @param {string} texto - Mensaje a mostrar al usuario.
 * @returns {void}
 */
function mostrarMensajeEstado(texto) {
    if (!mensajeEstadoProducto) return;

    mensajeEstadoProducto.textContent = texto;
    mensajeEstadoProducto.classList.remove("hidden");

    setTimeout(() => {
        mensajeEstadoProducto.classList.add("hidden");
    }, 2000);
}

// input de filtro
const filtroInput = document.createElement("input");
filtroInput.type = "text";
filtroInput.placeholder = " ⌕ Buscar en mi lista...";
filtroInput.id = "filtro-lista";

//  estilo de barra de escribir
filtroInput.className = "w-[80%] ml-[10%] pl-10 p-3 mb-6 rounded-xl border-2 !border-secundario bg-fondo text-principal focus:!border-principal focus:outline-none transition-all italic text-sm shadow-sm";

listaUl.parentNode.insertBefore(filtroInput, listaUl);





// Funciones

// cargar datos al refrescar
document.addEventListener("DOMContentLoaded", () => {
    const datosGuardados = localStorage.getItem("productos-pasteleria");
    if (datosGuardados) {
        const parsed = JSON.parse(datosGuardados);

        // Compatibilidad: antes guardábamos un array de strings, ahora usamos objetos { nombre, cantidad }
        if (Array.isArray(parsed)) {
            if (parsed.length === 0) {
                productos = [];
            } else if (typeof parsed[0] === "string") {
                // Convertir array de nombres en array de objetos con cantidad
                const mapa = {};
                parsed.forEach((nombre) => {
                    const clave = nombre.toLowerCase();
                    if (!mapa[clave]) {
                        mapa[clave] = { nombre, cantidad: 1 };
                    } else {
                        mapa[clave].cantidad += 1;
                    }
                });
                productos = Object.values(mapa);
            } else {
                productos = parsed;
            }
        } else {
            productos = [];
        }

        renderizarProductos();
    }
});

/**
 * Guarda el estado actual de la lista de productos en `localStorage`.
 * La información se serializa como JSON bajo la clave `productos-pasteleria`.
 * @returns {void}
 */
function actualizarAlmacenamiento() {
    localStorage.setItem("productos-pasteleria", JSON.stringify(productos));
}

/**
 * Calcula el descuento aplicable a un producto de tipo tarta según la promoción:
 * por cada 2 unidades del mismo pastel, la segunda se cobra al 50%.
 * @param {number} precioUnitario - Precio de una unidad del producto.
 * @param {number} cantidad - Cantidad de unidades del producto en el carrito.
 * @param {string} nombre - Nombre del producto para comprobar si entra en la promoción.
 * @returns {number} Importe de descuento a aplicar sobre ese producto (en euros).
 */
function calcularDescuentoTartas(precioUnitario, cantidad, nombre) {
    if (!tartasPromo.has(nombre) || precioUnitario <= 0) return 0;
    const pares = Math.floor(cantidad / 2);
    return pares * (precioUnitario / 2);
}

/**
 * Vuelca en el DOM el contenido actual de la lista de productos,
 * recalculando subtotales por producto, total del carrito y descuento por tartas.
 * También actualiza la visibilidad del mensaje de promoción de tartas.
 * @returns {void}
 */
function renderizarProductos() {
    listaUl.innerHTML = "";

    // Mensaje amable cuando no hay productos en la lista
    if (productos.length === 0) {
        const liVacio = document.createElement("li");
        liVacio.className =
            "w-[80%] ml-[10%] bg-fondo border-2 border-dashed border-principal/40 rounded-xl p-4 text-center text-principal italic text-sm";
        liVacio.textContent = "Aún no has añadido antojos";
        listaUl.appendChild(liVacio);

        if (totalCarritoSpan) {
            totalCarritoSpan.textContent = "0.00€";
        }
        if (promoTartasMsg) {
            promoTartasMsg.classList.add("hidden");
        }
        return;
    }

    let totalBruto = 0;
    let descuentoTartas = 0;

    productos.forEach((producto, index) => {
        const { nombre, cantidad } = producto;
        const precioUnitario = preciosCarta[nombre] ?? 0;
        const subtotal = precioUnitario * cantidad;
        totalBruto += subtotal;
        descuentoTartas += calcularDescuentoTartas(precioUnitario, cantidad, nombre);

        const li = document.createElement("li");

        // estilo de tarjeta de producto
        li.className = "flex w-[80%] ml-[10%] justify-between items-center gap-4 bg-fondo p-4 rounded-xl shadow-sm border-2 border-principal hover:shadow-md transition-all group animate-fadeIn";

        const span = document.createElement("span");
        span.textContent = cantidad > 1 ? `${nombre} x${cantidad}` : nombre;
        span.className = "text-principal font-medium";

        const contControles = document.createElement("div");
        // En móvil: botones en fila y precio debajo; en pantallas grandes: todo en fila
        contControles.className = "flex flex-col sm:flex-row items-center gap-1 sm:gap-3";

        const contBotones = document.createElement("div");
        // En móvil los botones se apilan en vertical; en escritorio, en horizontal
        contBotones.className = "flex flex-col sm:flex-row items-center gap-2";

        const spanPrecio = document.createElement("span");
        if (precioUnitario > 0) {
            spanPrecio.textContent = `${subtotal.toFixed(2)}€`;
            spanPrecio.className = "text-principal text-sm font-semibold";
        }

        const botonMenos = document.createElement("button");
        botonMenos.textContent = "−";
        botonMenos.className = "w-7 h-7 flex items-center justify-center rounded-md border-2 border-principal text-principal text-sm font-bold hover:bg-principal/10 transition-all";

        const botonMas = document.createElement("button");
        botonMas.textContent = "+";
        botonMas.className = "w-7 h-7 flex items-center justify-center rounded-md border-2 border-principal text-principal text-sm font-bold hover:bg-principal/10 transition-all";

        botonMenos.onclick = () => {
            if (productos[index].cantidad > 1) {
                productos[index].cantidad -= 1;
            } else {
                productos.splice(index, 1);
            }
            actualizarAlmacenamiento();
            renderizarProductos();
        };

        botonMas.onclick = () => {
            productos[index].cantidad += 1;
            actualizarAlmacenamiento();
            renderizarProductos();
        };

        contBotones.appendChild(botonMenos);
        contBotones.appendChild(botonMas);

        contControles.appendChild(contBotones);
        if (precioUnitario > 0) {
            contControles.appendChild(spanPrecio);
        }

        li.appendChild(span);
        li.appendChild(contControles);
        listaUl.appendChild(li);
    });

    const totalFinal = totalBruto - descuentoTartas;

    if (totalCarritoSpan) {
        totalCarritoSpan.textContent = `${totalFinal.toFixed(2)}€`;
    }

    if (promoTartasMsg) {
        if (descuentoTartas > 0) {
            promoTartasMsg.classList.remove("hidden");
        } else {
            promoTartasMsg.classList.add("hidden");
        }
    }
}

// Autocompletado: sugerir productos de la carta al escribir
inputProducto.addEventListener("input", () => {
    const texto = normalizarTexto(inputProducto.value);

    // Limpiar sugerencias anteriores
    sugerenciasUl.innerHTML = "";

    // Si no hay texto, no mostramos nada
    if (texto.length === 0) {
        return;
    }

    // Buscar coincidencias en la carta oficial
    const coincidencias = productosCarta
        .filter(p => normalizarTexto(p).startsWith(texto))
        .slice(0, 5); // máximo 5 sugerencias

    coincidencias.forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = nombre;
        li.className = "cursor-pointer px-3 py-2 rounded-lg bg-fondo hover:bg-principal/10 text-principal text-sm";

        li.addEventListener("click", () => {
            inputProducto.value = nombre;
            inputProducto.classList.remove("border-red-500");
            sugerenciasUl.innerHTML = "";
        });

        sugerenciasUl.appendChild(li);
    });
});

//añadir productos que sí estén (permitiendo cantidades)
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = inputProducto.value.trim();

    if (texto && existeEnCarta(texto)) {
        // Buscar si ya existe en la lista para aumentar cantidad
        const existente = buscarProductoEnLista(texto);

        if (existente) {
            existente.cantidad += 1;
        } else {
            productos.push({ nombre: texto, cantidad: 1 });
        }

        actualizarAlmacenamiento();
        renderizarProductos();
        inputProducto.value = "";
        inputProducto.focus();
        inputProducto.classList.remove("border-red-500");
        sugerenciasUl.innerHTML = "";
        mostrarMensajeEstado("Producto añadido correctamente.");
    } else {
        // mensaje al cliente si el producto no existe en la carta
        inputProducto.classList.add("border-red-500");
        if (!existeEnCarta(texto)) {
            mostrarMensajeEstado("Este producto no está en nuestra carta.");
        }
    }
});

// filtro de la lista
filtroInput.addEventListener("input", () => {
    const busqueda = filtroInput.value.toLowerCase();
    const items = listaUl.querySelectorAll("li");

    items.forEach(item => {
        const textoItem = item.querySelector("span").textContent.toLowerCase();
        item.style.display = textoItem.includes(busqueda) ? "flex" : "none";
    });
});