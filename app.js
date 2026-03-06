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

// Seleccionamos los elementos del DOM
const formulario = document.getElementById("formulario-producto");
const inputProducto = document.getElementById("input-producto");
const listaUl = document.getElementById("lista-productos");

let productos = [];

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
        productos = JSON.parse(datosGuardados);
        renderizarProductos();
    }
});

function actualizarAlmacenamiento() {
    localStorage.setItem("productos-pasteleria", JSON.stringify(productos));
}

function renderizarProductos() {
    listaUl.innerHTML = ""; 

    productos.forEach((nombre, index) => {
        const li = document.createElement("li");
        
        // estilo de tarjeta de producto
        li.className = "flex w-[80%] ml-[10%] justify-between items-center bg-fondo p-4 rounded-xl shadow-sm border-2 border-principal hover:shadow-md transition-all group animate-fadeIn";
        
        const span = document.createElement("span");
        span.textContent = nombre;
        span.className = "text-principal font-medium";
        
        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "ELIMINAR";
        
        // estilo boton eliminar
        botonBorrar.className = "text-[10px] text-principal font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-principal/10 transition-all font-black tracking-widest";
        
        botonBorrar.onclick = () => {
            productos.splice(index, 1); 
            actualizarAlmacenamiento(); 
            renderizarProductos();     
        };

        li.appendChild(span);
        li.appendChild(botonBorrar);
        listaUl.appendChild(li);
    });
}

//añadir productos que si esten
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = inputProducto.value.trim();

    // Comprobar si el producto existe en la carta oficial
    const existeEnCarta = productosCarta.some(p => p.toLowerCase() === texto.toLowerCase());
    
    // Comprobar si ya está en la lista de compra para no repetir
    const yaAñadido = productos.some(p => p.toLowerCase() === texto.toLowerCase());

    if (texto !== "" && existeEnCarta && !yaAñadido) {
        productos.push(texto);      
        actualizarAlmacenamiento(); 
        renderizarProductos();     
        inputProducto.value = "";   
        inputProducto.focus();
        inputProducto.classList.remove("border-red-500");
    } else {
//mensaje al cliente si existe el producto o ya está añadido
        inputProducto.classList.add("border-red-500");
        if (!existeEnCarta) {
            alert("Este producto no está en nuestra carta.");
        } else if (yaAñadido) {
            alert("Este producto ya está en tu lista.");
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
