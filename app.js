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

// precios por producto (por ración)
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

// seleccionamos los elementos del DOM
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
 * 
 * @param {string} texto
 * @returns {string} 
 */
function normalizarTexto(texto) {
    return texto.trim().toLowerCase();
}

/**

 * @param {string} nombre - nombre del producto a comprobar
 * @returns {boolean} `true` si el producto está en `productosCarta`, `false` en caso contrario.
 */
function existeEnCarta(nombre) {
    const buscado = normalizarTexto(nombre);
    return productosCarta.some((p) => normalizarTexto(p) === buscado);
}

/**
 * busca un producto ya añadido en la lista de compra.
 * @param {string} nombre - nombre del producto que se quiere localizar en la lista.
 * @returns {{nombre: string, cantidad: number} | undefined} l producto encontrado o `undefined` si no existe.
 */
function buscarProductoEnLista(nombre) {
    const buscado = normalizarTexto(nombre);
    return productos.find((p) => normalizarTexto(p.nombre) === buscado);
}

/**
 * muestra un mensaje de estado para informar al cliente.
 * @param {string} texto - mensaje a mostrar al usuario.
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
 * calcula el descuento aplicable:
 * 
 * por cada 2 unidades del mismo pastel, la segunda se cobra al 50%.
 * @param {number} precioUnitario - precio de una unidad del producto.
 * @param {number} cantidad - cantidad de unidades del producto en el carrito.
 * @param {string} nombre - nombre del producto para comprobar si entra en la promoción.
 * @returns {number} importe de descuento a aplicar sobre ese producto (en euros).
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

    // mensaje cuando no hay productos en la lista
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
        // en móvil: botones en fila y precio debajo; en pantallas grandes: todo en fila
        contControles.className = "flex flex-col sm:flex-row items-center gap-1 sm:gap-3";

        const contBotones = document.createElement("div");
        // en móvil los botones se apilan en vertical; en escritorio, en horizontal
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

// autocompletado: sugerir productos de la carta al escribir
inputProducto.addEventListener("input", () => {
    const texto = normalizarTexto(inputProducto.value);

    // limpiar sugerencias anteriores
    sugerenciasUl.innerHTML = "";

    // si no hay texto, no mostramos nada
    if (texto.length === 0) {
        return;
    }

    // buscar coincidencias en la carta oficial
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


const API_BASE_LOCAL = 'http://localhost:3000';
const API_BASE_REMOTE = 'https://taskflow-project-fpc2.onrender.com';
const enLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
let apiBaseActiva = enLocalhost ? API_BASE_LOCAL : API_BASE_REMOTE;

/**
 * Ejecuta una petición contra la API activa y, si falla por red en local,
 * reintenta automáticamente contra Render.
 * @param {(baseUrl: string) => Promise<any>} peticion
 * @returns {Promise<any>}
 */
const ejecutarConFallback = async (peticion) => {
    try {
        return await peticion(apiBaseActiva);
    } catch (error) {
        const falloDeRed = error?.message === 'Network Error' || error?.code === 'ERR_NETWORK';
        const puedeFallback = apiBaseActiva === API_BASE_LOCAL;

        if (falloDeRed && puedeFallback) {
            apiBaseActiva = API_BASE_REMOTE;
            return peticion(apiBaseActiva);
        }

        throw error;
    }
};

/**
 * Petición HTTP asíncrona (GET): obtiene todas las tareas del servidor.
 * @returns {Promise<Array>} lista de tareas.
 */
const obtenerTareas = async () => {
    const respuesta = await ejecutarConFallback((baseUrl) => axios.get(`${baseUrl}/api/v1/tasks`));
    return respuesta.data;
};

/**
 * Petición HTTP asíncrona (POST): crea una nueva tarea.
 * @param {{ title: string, priority: string }} datos
 * @returns {Promise<object>} tarea creada.
 */
const crearTarea = async (datos) => {
    const respuesta = await ejecutarConFallback((baseUrl) => axios.post(`${baseUrl}/api/v1/tasks`, datos));
    return respuesta.data;
};

/**
 * Petición HTTP asíncrona (DELETE): elimina una tarea por id.
 * @param {string} id
 * @returns {Promise<void>}
 */
const eliminarTarea = async (id) => {
    await ejecutarConFallback((baseUrl) => axios.delete(`${baseUrl}/api/v1/tasks/${id}`));
};

const renderizarBloqueTareas = async () => {
    const contenedor = document.getElementById('taskList');
    if (!contenedor) return;

    contenedor.innerHTML = `
        <h2 class="text-principal text-2xl font-bold mb-4 border-b pb-2 italic">📋 Tareas del Backend</h2>
        <form id="form-task-api" class="flex flex-col sm:flex-row gap-2 mb-4">
            <input id="task-title-api" type="text" minlength="3" required placeholder="Título de la tarea"
                class="flex-1 p-2 rounded-lg border-2 border-principal/40 focus:outline-none focus:border-principal" />
            <select id="task-priority-api"
                class="p-2 rounded-lg border-2 border-principal/40 focus:outline-none focus:border-principal">
                <option value="low">Baja</option>
                <option value="medium" selected>Media</option>
                <option value="high">Alta</option>
            </select>
            <button type="submit" class="bg-principal text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                Añadir
            </button>
        </form>
        <div id="task-feedback-api" class="text-sm mb-3 text-principal"></div>
        <div id="task-items-api" class="space-y-2"></div>
    `;

    const feedback = document.getElementById('task-feedback-api');
    const items = document.getElementById('task-items-api');
    const formularioTareas = document.getElementById('form-task-api');
    const inputTitulo = document.getElementById('task-title-api');
    const inputPrioridad = document.getElementById('task-priority-api');

    const dibujarTareas = async () => {
        try {
            const tareas = await obtenerTareas();
            items.innerHTML = '';

            if (!Array.isArray(tareas) || tareas.length === 0) {
                items.innerHTML = '<p class="italic text-principal/70">No hay tareas todavía.</p>';
                return;
            }

            tareas.forEach((tarea) => {
                const item = document.createElement('div');
                item.className = 'bg-blancoweb p-3 rounded-xl border-l-4 border-principal shadow-sm flex justify-between items-center gap-3';

                const texto = document.createElement('span');
                texto.className = 'text-principal font-medium';
                texto.textContent = `${tarea.title} (Prioridad: ${tarea.priority ?? 'medium'})`;

                const botonEliminar = document.createElement('button');
                botonEliminar.className = 'text-xs bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition';
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.addEventListener('click', async () => {
                    try {
                        await eliminarTarea(tarea.id);
                        feedback.textContent = 'Tarea eliminada correctamente.';
                        await dibujarTareas();
                    } catch (error) {
                        console.error('Error al eliminar tarea:', error);
                        feedback.textContent = 'No se pudo eliminar la tarea.';
                    }
                });

                item.appendChild(texto);
                item.appendChild(botonEliminar);
                items.appendChild(item);
            });
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            items.innerHTML = '<p class="text-red-500 font-bold">⚠️ El servidor de Node.js no responde.</p>';
        }
    };

    formularioTareas.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = inputTitulo.value.trim();
        const priority = inputPrioridad.value;

        if (title.length < 3) {
            feedback.textContent = 'El título debe tener al menos 3 caracteres.';
            return;
        }

        try {
            await crearTarea({ title, priority });
            feedback.textContent = 'Tarea creada correctamente.';
            inputTitulo.value = '';
            inputTitulo.focus();
            await dibujarTareas();
        } catch (error) {
            console.error('Error al crear tarea:', error);
            const mensajeServidor = error?.response?.data?.message;
            feedback.textContent = mensajeServidor || 'No se pudo crear la tarea.';
        }
    });

    await dibujarTareas();
};

renderizarBloqueTareas();