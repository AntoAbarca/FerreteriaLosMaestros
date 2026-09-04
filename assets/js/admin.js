document.addEventListener("DOMContentLoaded", () => {
//datos iniciales

    const productosIniciales = [
        {
            codigo: "FER-001",
            producto: "Martillo de acero",
            categoria: "Herramientas",
            stock: 4,
            minimo: 10
        },
        {
            codigo: "FER-002",
            producto: "Destornillador Phillips",
            categoria: "Herramientas",
            stock: 15,
            minimo: 8
        },
        {
            codigo: "FER-003",
            producto: "Taladro eléctrico",
            categoria: "Herramientas eléctricas",
            stock: 3,
            minimo: 5
        },
        {
            codigo: "FER-004",
            producto: "Sierra circular",
            categoria: "Herramientas eléctricas",
            stock: 7,
            minimo: 5
        },
        {
            codigo: "FER-005",
            producto: "Cinta métrica 5m",
            categoria: "Medición",
            stock: 2,
            minimo: 10
        },
        {
            codigo: "FER-006",
            producto: "Juego de llaves",
            categoria: "Herramientas",
            stock: 12,
            minimo: 6
        },
        {
            codigo: "FER-007",
            producto: "Guantes de trabajo",
            categoria: "Seguridad",
            stock: 20,
            minimo: 10
        },
        {
            codigo: "FER-008",
            producto: "Casco de seguridad",
            categoria: "Seguridad",
            stock: 9,
            minimo: 5
        }
    ];


    const cuentasIniciales = [
        {
            empresa: "Constructora Andes Ltda.",
            rut: "76.123.456-7",
            credito: 2000000,
            deuda: 850000
        },
        {
            empresa: "Servicios El Roble SpA",
            rut: "77.234.567-8",
            credito: 1500000,
            deuda: 1200000
        },
        {
            empresa: "Construcciones del Sur Ltda.",
            rut: "78.345.678-9",
            credito: 3000000,
            deuda: 500000
        }
    ];


    const usuariosIniciales = [
        {
            nombre: "Ana Pérez",
            usuario: "aperez",
            rol: "Administrador",
            estado: "Activo"
        },
        {
            nombre: "Carlos Soto",
            usuario: "csoto",
            rol: "Vendedor",
            estado: "Activo"
        },
        {
            nombre: "María González",
            usuario: "mgonzalez",
            rol: "Contratista",
            estado: "Activo"
        }
    ];


    // =========================
    // CARGAR DATOS
    // =========================

    let productos = cargar("admin_productos", productosIniciales);
    let cuentas = cargar("admin_cuentas", cuentasIniciales);
    let usuarios = cargar("admin_usuarios", usuariosIniciales);

    const tablaStock =
        document.getElementById("tablaStockAdmin");
    const tablaCuentas =
        document.getElementById("tablaCuentasAdmin");
    const tablaUsuarios =
        document.getElementById("tablaUsuariosAdmin");
    const formUsuario =
        document.getElementById("formNuevoUsuario");


    //inicializacion
    renderizarProductos();

    renderizarCuentas();

    renderizarUsuarios();

});