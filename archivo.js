const productos = [
  {
    id: 1,
    precio: 120,
    nombre: 'Queso',
    condimento: 'Con Sal',
    cantidad: [30, 60, 90],
    imagen: './img/DonattoQueso.jpg'
  },
  {
    id: 2,
    precio: 120,
    nombre: 'Jamon',
    condimento: 'Con Sal',
    cantidad: [30, 60, 90],
    imagen: './img/jamon.jpg'
  },
  {
    id: 3,
    precio: 120,
    nombre: 'Chia',
    condimento: 'Con Sal',
    cantidad: [30, 60, 90],
    imagen: './img/chia.jpg'
  },
  {
    id: 4,
    precio: 120,
    nombre: 'Lino',
    condimento: 'Con Sal',
    cantidad: [30, 60, 90],
    imagen: './img/Lino.jpg'
  },
  {
    id: 5,
    precio: 120,
    nombre: 'Original',
    condimento: 'Con Sal o Sin Sal',
    cantidad: [30, 60, 90],
    imagen: './img/Original.jpg'
  },
  {
    id: 6,
    precio: 120,
    nombre: 'Mix de semillas',
    condimento: 'Con Sal o Sin Sal',
    cantidad: [30, 60, 90],
    imagen: './img/mix-de-semillas.jpg'
  },
  {
    id: 7,
    precio: 120,
    nombre: 'Pizza',
    condimento: 'Con Sal o Sin Sal',
    cantidad: [30, 60, 90],
    imagen: './img/pizza.jpg'
  },
  {
    id: 8,
    precio: 120,
    nombre: 'Espinaca',
    condimento: 'Con Sal',
    cantidad: [30, 60, 90],
    imagen: './img/espinaca.jpg'
  }
];

let listaContainer = document.querySelector('#lista');
let listaContainerDos = document.querySelector('#lista-2');
const carritoGuardado = localStorage.getItem('carrito');
let miCarrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
// let miCarrito;
// if (carritoGuardado) {
//   miCarrito = JSON.parse(carritoGuardado)
// } else {
//   miCarrito = [];
// }
console.log('carrito: ', miCarrito);

function imprimirProductos() {
  listaContainer.innerHTML = '';

  productos.forEach((prod) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('my-5');
    card.classList.add('col-12');
    card.classList.add('col-md-4');
    card.classList.add('col-lg-3');
    card.innerHTML = `
      <div class="imagenProductoContainer">
      <img class="imagenProducto" src="${prod.imagen}" alt="${prod.nombre}"/>
      </div>
      <div class="column">
          <h2>${prod.nombre}</h2>
          <h3>${prod.condimento}</h3>
          <h4>Elija una cantidad:</h4>
          <h5>Total: $${prod.precio * prod.cantidad[0]}</h5>
          <form onsubmit="guardarProducto(event)" id="${prod.id}">
           <select onchange="calcularPrecio(event)" name="cantidad" id="cantidad">
             <option value="30" selected>30</option>
             <option value="60">60</option>
             <option value="90">90</option>
            </select>
          </form>
      </div>  `;
    listaContainer.appendChild(card);
    const form = card.children[1].children[4];
    suscripcionClickBoton(prod.nombre, form);
  });
}

function renderizarCarrito() {
  listaContainerDos.innerHTML = '';

  miCarrito.forEach((prod) => {
    let cardDos = document.createElement('div');
    cardDos.classList.add('card');
    cardDos.classList.add('col-12');
    cardDos.classList.add('col-md-4');
    cardDos.classList.add('col-lg-3');
    cardDos.innerHTML = `
    <div class="imagenProductoContainer">
    <img class="imagenProducto" src="${prod.imagen}" alt="${prod.nombre}" />
    </div>
        <div class="column">
            <h2>${prod.nombre}</h2>
            <h3>${prod.cantidad}</h3>
            <h4>Total: $${prod.precio * prod.cantidad}</h4>
            <form onsubmit="borrarProducto(event)" id="${prod.id}">
           <button class="botonBorrar btn-warning" type="submit" value="Borrar"> borrar </button>
           </form>
        </div>`;
    listaContainerDos.appendChild(cardDos);
  });
  evaluarBotonComprar();
}

function borrarProducto(event) {
  event.preventDefault();
  const idProductoABorrar = parseInt(event.target.id);
  //const cantidadABorrar = parseInt(event.target[0].value);
  const index = miCarrito.findIndex((prod) => prod.id === idProductoABorrar);
  const productoBorrado = miCarrito.splice(index, 1)[0];
  localStorage.setItem('carrito', JSON.stringify(miCarrito));
  renderizarCarrito();

  //mensaje toast "se elimino del carrito"

  Toastify({
    text: `Se elimino ${productoBorrado.nombre} del carrito!`,
    duration: 3000,
    destination: 'https://github.com/apvarun/toastify-js',
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:
        'radial-gradient(circle at 50% -20.71%, #d7c35d 0, #deba54 8.33%, #e4b04d 16.67%, #e9a546 25%, #ed9841 33.33%, #f0893e 41.67%, #f2793c 50%, #f3673d 58.33%, #f35542 66.67%, #f34249 75%, #f22b52 83.33%, #f0065d 91.67%, #ec0069 100%)'
    },
    onClick: function () {} // Callback after click
  }).showToast();
}

function guardarProducto(event) {
  event.preventDefault();

  const idProductoSeleccionado = parseInt(event.target.id);
  const cantidadSeleccionada = parseInt(event.target[0].value);

  const itemEnCarrito = miCarrito.find((item) => item.id === idProductoSeleccionado);
  if (itemEnCarrito) {
    itemEnCarrito.cantidad += cantidadSeleccionada;
  } else {
    const productoSeleccionado = productos.find((prod) => prod.id === idProductoSeleccionado);
    const nuevoProducto = { ...productoSeleccionado };
    nuevoProducto.cantidad = cantidadSeleccionada;
    miCarrito.push(nuevoProducto);
  }
  console.log('carrito: ', miCarrito);
  localStorage.setItem('carrito', JSON.stringify(miCarrito));
  renderizarCarrito();
}

imprimirProductos();
renderizarCarrito();

function suscripcionClickBoton(nombre, form) {
  const boton = document.createElement('button');
  boton.classList.add('buttonAgregar');
  boton.classList.add('btn-warning');
  boton.type = 'submit';
  boton.innerText = 'Agregar';
  boton.addEventListener('click', () =>
    Toastify({
      text: `Se agrego ${nombre} al carrito!`,
      duration: 3000,
      destination: 'https://github.com/apvarun/toastify-js',
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'white',
        color: 'black'
      },
      onClick: function () {} // Callback after click
    }).showToast()
  );
  form.appendChild(boton);
}

function comprarProducto(event) {
  const precioSeleccionado = parseInt(event.target.precio);
  const buttonComprar = document.querySelector('.botonComprar');
  buttonComprar.addEventListener('click', () => {
    return alert(`su precio es: ${precioSeleccionado}`);
  });
  console.log(precioSeleccionado);
  console.log(buttonComprar);
}

//llamamos a la API
const listaApi = document.query;
fetch('https://api.chucknorris.io/jokes/random').then((resp) =>
  resp
    .clone()
    .json()
    .then((chiste) =>
      Toastify({
        text: `${chiste.value}`,
        duration: 3000,
        destination: 'https://github.com/apvarun/toastify-js',
        newWindow: true,
        close: true,
        gravity: 'center', // `top` or `bottom`
        position: 'center', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'white',
          color: 'black'
        },
        onClick: function () {} // Callback after click
      }).showToast()
    )
);

//Creamos una funcion para calcular el precio
function calcularPrecio(event) {
  let cantidad = parseInt(event.target.value);
  const idProductoSeleccionado = parseInt(event.target.parentElement.id);
  const productoSeleccionado = productos.find((prod) => prod.id === idProductoSeleccionado);
  const total = productoSeleccionado.precio * cantidad;
  event.target.parentElement.parentElement.children[3].textContent = `Total: $${total}`;
}

//evaluamos si el carrito tiene algo
function evaluarBotonComprar() {
  if (miCarrito.length > 0) {
    let mostrarBoton = document.querySelector('.botonCarrito');
    mostrarBoton.classList.remove('d-none');
    mostrarBoton.classList.add('d-block');
  } else {
    mostrarBoton = document.querySelector('.botonCarrito');
    mostrarBoton.classList.add('d-none');
  }
}

//Si tiene algo realizamos la compra
function realizarCompra() {
  const realizarCompra = document.querySelector('.botonCarrito');
  miCarrito = [];
  localStorage.clear();
  renderizarCarrito();
  evaluarBotonComprar();
  Toastify({
    text: `Tu compra fue realizada con exito!`,
    duration: 3000,
    destination: 'https://github.com/apvarun/toastify-js',
    newWindow: true,
    close: true,
    gravity: 'center', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'white',
      color: 'black'
    },
    onClick: function () {} // Callback after click
  }).showToast();
}
