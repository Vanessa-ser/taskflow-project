AI Comparison

En este documento se compararán diferentes herramientas de inteligencia artificial utilizadas durante el proyecto.

Aquí se analizarán sus ventajas, desventajas y su utilidad durante el desarrollo.
_______________________________________________________________________________________________________________________________________________
·Event loop:
----------------------------------------------------------------------------------------------------
   -> ChatGPT:
    ......................................
           - Explicame que es un event loop en JavaScript con ejemplos.
           + El Event Loop en JavaScript es el mecanismo que permite manejar operaciones asíncronas (como setTimeout, peticiones HTTP o eventos del               usuario) sin bloquear el hilo principal.
             JavaScript es single-threaded (un solo hilo para ejecutar código), pero gracias al event loop puede manejar muchas tareas “al mismo                  tiempo”.
              1. La idea básica
                El Event Loop coordina tres partes principales:
                 - Call Stack (pila de ejecución) → donde se ejecuta el código síncrono.
                 - Web APIs / APIs del entorno → temporizadores, fetch, DOM, etc.
                 - Callback Queue / Task Queue → cola donde esperan los callbacks listos para ejecutarse.
                El Event Loop revisa continuamente:
                 - Si el Call Stack está vacío, toma la siguiente tarea de la cola y la ejecuta.
              2. Ejemplo simple:
                console.log("Inicio");
                setTimeout(() => {
                  console.log("Timeout");
                  }, 0);
                console.log("Fin");
                Salida real:
                  Inicio, Fin y Timeout
                ¿Qué pasó?
                  1."Inicio" entra al Call Stack → se ejecuta.
                  2.setTimeout se envía a las Web APIs con 0 ms.
                  3."Fin" se ejecuta inmediatamente.
                  4.Cuando el temporizador termina, el callback va a la Callback Queue.
                  5.El Event Loop lo mueve al Call Stack cuando queda vacío.
              3. Visualización paso a paso
                Código:
                    console.log("A");
                    setTimeout(() => {
                      console.log("B");
                      }, 1000);
                     console.log("C");
                Orden:
                  1.Stack → console.log("A")
                  2.setTimeout → Web APIs
                  3.Stack → console.log("C")
                  4.1 segundo después → callback "B" entra a la queue
                  5.Event Loop → lo ejecuta
                 Resultado:
                  A
                  C
                  B
              4. Microtasks vs Macrotasks (detalle importante)
                JavaScript tiene dos colas principales:
                  Macrotasks
                    setTimeout
                    setInterval
                    setImmediate
                    eventos DOM 
                  Microtasks
                    Promise.then
                    queueMicrotask
                    MutationObserver
                  El Event Loop siempre ejecuta primero las microtasks antes de la siguiente macrotask.
              5. Ejemplo con Promises
                  console.log("1");
                  setTimeout(() => console.log("2"), 0);              
                  Promise.resolve().then(() => console.log("3"));              
                  console.log("4");  
                Resultado:
                  1
                  4
                  3
                  2
                Explicación:
                  1.1 → stack                
                  2.setTimeout → macrotask                
                  3.Promise.then → microtask                
                  4.4 → stack                
                  5.microtasks → 3               
                  6.macrotasks → 2
              6. Resumen mental rápido
                El Event Loop sigue este ciclo:
                  1. Ejecutar código del stack
                  2. Cuando stack esté vacío:
                     - ejecutar todas las microtasks
                  3. Ejecutar la siguiente macrotask
                  4. repetir
             💡 Idea clave:
                El Event Loop permite que JavaScript maneje asincronía sin multithreading real, delegando tareas al entorno y ejecutando callbacks
                cuando el stack está libre.
    ................................          
   -> Claude:
    ................................
          - Explicame que es un event loop en JavaScript con ejemplos.
          + Event Loop en JavaScript
            El event loop es el mecanismo que permite a JavaScript (siendo single-threaded) manejar operaciones asíncronas sin bloquear la ejecución.
            ¿Cómo funciona?
              JavaScript tiene tres componentes clave:
              1. Call Stack — donde se ejecuta el código, función por función.
              2. Web APIs / Task Queue — donde esperan las operaciones asíncronas (setTimeout, fetch, eventos...).
              3. Event Loop — el "vigilante" que mueve tareas del queue al stack cuando este está vacío.
            Ejemplo 1 — Orden de ejecución básico
                javascriptconsole.log("1 - Inicio");                
                setTimeout(() => {
                  console.log("2 - Dentro del setTimeout");
                }, 0);                
                console.log("3 - Fin");                
                // Output:
                // 1 - Inicio
                // 3 - Fin
                // 2 - Dentro del setTimeout
            Aunque el setTimeout tiene 0ms, se ejecuta al final porque pasa por el Task Queue y el event loop lo mete al stack solo cuando este 
            estávacío.          
            Ejemplo 2 — Microtasks vs Macrotasks
                Las Promesas tienen mayor prioridad que setTimeout:
                      javascriptconsole.log("1 - Inicio");            
                      setTimeout(() => console.log("2 - setTimeout"), 0);            
                      Promise.resolve().then(() => console.log("3 - Promise"));            
                      console.log("4 - Fin");            
                      // Output:
                      // 1 - Inicio
                      // 4 - Fin
                      // 3 - Promise    ← Microtask (mayor prioridad)
                      // 2 - setTimeout ← Macrotask (menor prioridad)
            --------------------------------------------------------------------------          
            Tipo      /                Ejemplos                          /  Prioridad
           ----------------------------------------------------------------------------
            Microtask    Promise.then, queueMicrotask, MutationObserver       Alta ✅
            Macrotask    setTimeout, setInterval, eventos del DOM             Normal
            ---------------------------------------------------------------------------
            Ejemplo 3 — Código bloqueante vs no bloqueante
                      javascript// ❌ BLOQUEANTE - congela el hilo
                      function esperar(ms) {
                        const fin = Date.now() + ms;
                        while (Date.now() < fin) {} // bloquea el call stack
                      }            
                      console.log("Inicio");
                      esperar(3000); // nadie puede hacer nada durante 3 segundos
                      console.log("Fin"); // aparece después de 3s
                      // ✅ NO BLOQUEANTE - deja que el event loop trabaje
                      console.log("Inicio");
                      setTimeout(() => console.log("Operación async"), 3000);
                      console.log("Fin"); // aparece inmediatamente, no espera
                      -----------------------            
                      ### El flujo resumido
                      ```
                         Call Stack          Task Queue         Microtask Queue
                        ┌──────────┐        ┌──────────┐        ┌──────────┐
                        │ función  │        │setTimeout│        │ Promise  │
                        │   ...    │  ←───  │callback  │  ←───  │ .then()  │
                        └──────────┘        └──────────┘        └──────────┘
                              ↑
                         Event Loop
                        (vigilante 👀)
            -----------------------
                1.El call stack ejecuta código síncrono.
                2.Las operaciones async se van a las Web APIs.
                3.Al terminar, sus callbacks van al Task Queue (o Microtask Queue).
                4.El event loop mueve callbacks al stack cuando está vacío, priorizando siempre las microtasks.
           Esto es lo que hace que JavaScript pueda manejar miles de peticiones de red, timers y eventos sin necesitar múltiples hilos.
  _____________________________________________________________________________________________________________________________________________

  ·DOM:
  ----------------------------------------------------------------------------------------------------
   -> ChatGPT:
    ......................................
           - Explicame que es DOM en JavaScript con ejemplos.
           + 1. Cómo funciona el DOM
                  Cuando el navegador carga una página HTML, crea un árbol de nodos.
                  Ejemplo HTML:
                    <html>
                      <body>
                        <h1 id="titulo">Hola</h1>
                        <p>Texto</p>
                      </body>
                    </html>
                  El DOM se representa así:
                    Document
                     └── html
                          └── body
                               ├── h1
                               │    └── "Hola"
                               └── p
                                    └── "Texto"
                   Cada elemento (h1, p, body, etc.) es un nodo del DOM que JavaScript puede modificar.
            2. Acceder a elementos del DOM
                JavaScript puede seleccionar elementos usando métodos del objeto document.
                  Ejemplo:
                      const titulo = document.getElementById("titulo");
                      console.log(titulo);
                  Esto devuelve el elemento:
                      <h1 id="titulo">Hola</h1>
            3. Cambiar contenido del DOM
                 Puedes modificar el contenido de un elemento.
                    const titulo = document.getElementById("titulo");
                    titulo.textContent = "Hola Mundo";
                 Resultado en la página:
                   <h1 id="titulo">Hola Mundo</h1>
            4. Cambiar estilos con el DOM
                  const titulo = document.getElementById("titulo");             
                  titulo.style.color = "red";
                  titulo.style.fontSize = "40px";
                La página cambia visualmente sin recargar.
            5. Crear elementos nuevos         
                También puedes crear nodos nuevos en el DOM.              
                    const nuevoParrafo = document.createElement("p");             
                    nuevoParrafo.textContent = "Este párrafo fue creado con JavaScript";           
                    document.body.appendChild(nuevoParrafo);              
                 Esto agrega al HTML:  
                  <p>Este párrafo fue creado con JavaScript</p>
            6. Manejar eventos del DOM
               El DOM también permite reaccionar a acciones del usuario.              
                  Ejemplo HTML:           
                      <button id="btn">Haz clic</button>
                  JavaScript:
                  const boton = document.getElementById("btn");              
                  boton.addEventListener("click", () => {
                    alert("Hiciste clic");
                  });
               Cuando el usuario hace clic, se ejecuta el código.       
            7. Métodos comunes del DOM
                Algunos muy usados:              
                    Método	Para qué sirve
                    getElementById()	buscar por id
                    querySelector()	buscar con selector CSS
                    querySelectorAll()	seleccionar varios
                    createElement()	crear elementos
                    appendChild()	añadir elementos
                    remove()	eliminar elementos
                Ejemplo moderno:
                     const elemento = document.querySelector(".clase");
            8. Ejemplo completo
                 HTML:
                    <h1 id="titulo">Hola</h1>
                    <button id="btn">Cambiar texto</button>
                 JavaScript:  
                    const titulo = document.querySelector("#titulo");
                    const boton = document.querySelector("#btn");
                    boton.addEventListener("click", () => {
                      titulo.textContent = "Texto cambiado";
                    });
               Cuando el usuario hace clic → el DOM cambia. 
            ✅ Resumen simple
              El DOM es:
               - Una estructura de árbol del HTML              
               - Que JavaScript puede manipular              
               - Para cambiar contenido, estilos y estructura de la página en tiempo real
----------------------------------------------------------------------------------------------------
   -> Claude:
    ......................................
               
__________________________________________________________________________________________________________________________________________________
  
