// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

//! Funciones

//?                         1.- Leer contenido del curso que estamos seleccionando

const leerDatos = (e) => {
	const cursoSeleccionado = e.target.parentElement.parentElement;

	//?                       2.- Crearemos un objeto con el contenido del curso seleccionado

	const infoCurso = {
		img: cursoSeleccionado.querySelector("img").src,
		titulo: cursoSeleccionado.querySelector("h4").textContent,
		precio: cursoSeleccionado.querySelector(".precio span")
			.textContent,
		id: cursoSeleccionado
			.querySelector("a")
			.getAttribute("data-id"),
		cantidad: 1,
	};

	//?                     3.- Agregar Elementos al Arreglo articulosCarrito

	articulosCarrito = [...articulosCarrito, infoCurso];
	console.log(articulosCarrito);
	carritoHTML();
};

//?              4.- Limpiar el Carrito para no duplicar elementos
const limpiarCarrito = () => {
	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
};

//?                      5.- Mostrar cursos en el carrito de compras
const carritoHTML = () => {
	//limpia el HTML
	limpiarCarrito();
	// Recorre el Carrito
	articulosCarrito.forEach((curso) => {
		const row = document.createElement("tr");
		row.innerHTML = `
      <td><img src="${curso.img}" width = "100"></td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>${curso.cantidad}</td>
      <td>
          <a href="#" class="borrar-curso" data-id=${curso.id}> X </a>
      </td>
    `;
		// Agregando el HTML al contenedor
		contenedorCarrito.appendChild(row);
	});
};

//TODO            evento principal que llama todo Agregando Curso

const agregarCurso = (e) => {
	e.preventDefault();
	e.target.classList.contains("agregar-carrito") ? leerDatos(e) : null;
};

cargarEventListeners();
function cargarEventListeners() {
	// Agregando un curso al carrito tras presionar el boton "Agregar al carrito"
	listaCursos.addEventListener("click", agregarCurso);
}
