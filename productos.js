let productos = [];

const agregarProductos = (id, nombre, precio) => {
    let producto = productos.find(p => p.id === id);

    if (producto) {
        producto.cantidad++;
        enviarDatos('PUT', producto);
    } else {
        producto = { id, nombre, precio, cantidad: 1 };
        productos.push(producto);
        enviarDatos('POST', producto);
    }
    actualizarTabla();
};

const eliminarProducto = (id) => {
    productos = productos.filter(p => p.id !== id);
    enviarDatos('DELETE', { id });
    actualizarTabla();
};

const actualizarTabla = () => {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    let total = 0;

    productos.forEach(producto => {
        const fila = tbody.insertRow();
        fila.insertCell(0).textContent = producto.nombre;
        fila.insertCell(1).textContent = producto.cantidad;
        fila.insertCell(2).textContent = producto.precio;
        fila.insertCell(3).textContent = (producto.precio * producto.cantidad).toFixed(2);

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarProducto(producto.id);
        fila.insertCell(4).appendChild(botonEliminar);

        total += producto.precio * producto.cantidad;
    });

    document.getElementById('total').textContent = total.toFixed(2);
};

const enviarDatos = async(metodo, data) => {
    const url = metodo === 'DELETE' ? `http://localhost:3333/productos/${data.id}` : 'http://localhost:3333/productos';
    
    try {
        const response = await fetch(url, {
            method: metodo,
            headers: {
                'Content-type': 'application/json',
            },
            body: metodo !== 'DELETE' ? JSON.stringify(data) : null,
        });
        
        const result = await response.json();
        console.log(`${metodo} exitoso`, result);
    } catch (error) {
        console.error(`${metodo} error`, error);
    }
};

const cargarProductos = async () => {
    try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        productos = data;
        actualizarTabla();
    } catch (error) {
        console.error('Error al cargar productos', error);
    }
};

window.onload = cargarProductos;
