document.addEventListener("DOMContentLoaded", () => {

    //obtener usuario
    function obtenerClaveCarrito() {

        const datosSesion = localStorage.getItem("sesionActiva");

        if (!datosSesion) {
            return "carrito_invitado";
        }
        try {
            const sesion = JSON.parse(datosSesion);
            return "carrito_" + sesion.usuario;
        } catch (error) {
            console.error("Error al leer la sesión:", error);
            return "carrito_invitado";
        }
    }

    //cargar carrito
    function cargarCarrito() {

        const datos = localStorage.getItem(obtenerClaveCarrito());

        if (!datos) {
            return [];
        }
        try {
            return JSON.parse(datos);
        } catch (error) {
            console.error("Error al cargar el carrito:", error);
            return [];
        }
    }

    //guardar carrito
    function guardarCarrito(carrito) {
        localStorage.setItem(
            obtenerClaveCarrito(),
            JSON.stringify(carrito)
        );
    }


    //formato de precios
    function formatoPesos(valor) {
        return "$" + Number(valor).toLocaleString("es-CL");
    }

    //mostrar carrito
    function mostrarCarrito() {

        const carrito = cargarCarrito();
        const carritoVacio = document.getElementById("carritoVacio");
        const contenidoCarrito = document.getElementById("contenidoCarrito");
        const tablaCarrito = document.getElementById("tablaCarrito");

        //si no hay productos
        if (carrito.length === 0) {

            carritoVacio.classList.remove("d-none");
            contenidoCarrito.classList.add("d-none");

            return;
        }

        //hay productos
        carritoVacio.classList.add("d-none");
        contenidoCarrito.classList.remove("d-none");
        tablaCarrito.innerHTML = "";
        let subtotal = 0;

        carrito.forEach((item, indice) => {

            const precio = Number(item.precio) || 0;
            const cantidad = Number(item.cantidad) || 0;
            const subtotalProducto = precio * cantidad;
            subtotal += subtotalProducto;
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>
                    <strong>${item.producto}</strong>
                </td>
                <td>
                    ${item.codigo}
                </td>
                <td>
                    ${formatoPesos(precio)}
                </td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <button
                            class="btn btn-sm btn-outline-secondary"
                            data-accion="restar"
                            data-indice="${indice}">
                            <i class="bi bi-dash"></i>
                        </button>
                        <span class="fw-bold">
                            ${cantidad}
                        </span>
                        <button
                            class="btn btn-sm btn-outline-secondary"
                            data-accion="sumar"
                            data-indice="${indice}">
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                </td>
                <td>
                    <strong>
                        ${formatoPesos(subtotalProducto)}
                    </strong>
                </td>
                <td>
                    <button
                        class="btn btn-sm btn-outline-danger"
                        data-accion="eliminar"
                        data-indice="${indice}"
                        title="Eliminar producto">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tablaCarrito.appendChild(fila);
        });

        //actualizar totales
        document.getElementById("subtotalCarrito").textContent =
            formatoPesos(subtotal);
        document.getElementById("totalCarrito").textContent =
            formatoPesos(subtotal);
    }

    //modificar cantidad
    function modificarCantidad(indice, cambio) {
        const carrito = cargarCarrito();
        if (!carrito[indice]) {
            return;
        }

        carrito[indice].cantidad += cambio;

        //evitar cantidades menores a 1
        if (carrito[indice].cantidad <= 0) {
            carrito.splice(indice, 1);
        }
        guardarCarrito(carrito);
        mostrarCarrito();
    }

    //eliminar producto
    function eliminarProducto(indice) {
        const carrito = cargarCarrito();
        if (!carrito[indice]) {
            return;
        }
        carrito.splice(indice, 1);
        guardarCarrito(carrito);
        mostrarCarrito();
    }
    
    //botones
    const tablaCarrito = document.getElementById("tablaCarrito");

    tablaCarrito.addEventListener("click", event => {

        const boton = event.target.closest("[data-accion]");

        if (!boton) {
            return;
        }

        const accion = boton.dataset.accion;
        const indice = Number(boton.dataset.indice);

        if (accion === "sumar") {
            modificarCantidad(indice, 1);
        }
        if (accion === "restar") {
            modificarCantidad(indice, -1);
        }
        if (accion === "eliminar") {
            eliminarProducto(indice);
        }
    });

    window.addEventListener("storage", event => {

        if (event.key === obtenerClaveCarrito()) {
            mostrarCarrito();
        }
    });
    mostrarCarrito();
});