// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

//! Funciones

// eliminar curso del carrito

const eliminarCurso = (e) => {
	e.preventDefault();
	const cursoId = e.target.getAttribute("data-id");
	e.target.classList.contains("borrar-curso")
		? (articulosCarrito = articulosCarrito.filter(
				(curso) => curso.id !== cursoId
		  ))
			? carritoHTML()
			: null
		: null;
};

//? Muestra los cursos previamente seleccionados
document.addEventListener("DOMContentLoaded", () => {
	articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
	carritoHTML();
});

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

	//?        2.1 Revisar si un elemento ya existe en el carrito
	const existe = articulosCarrito.some(
		(curso) => curso.id === infoCurso.id
	);

	if (existe) {
		// Actualizamos la cantidad
		const cursos = articulosCarrito.map((curso) => {
			if (curso.id === infoCurso.id) {
				curso.cantidad++;
				return curso;
			} else {
				return curso;
			}
		});
		articulosCarrito = [...cursos];
	} else {
		// Agregamos el curso al carrito
		articulosCarrito = [...articulosCarrito, infoCurso];
	}

	//?                     3.- Agregar Elementos al Arreglo articulosCarrito

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
		const { img, titulo, precio, cantidad, id } = curso;

		const row = document.createElement("tr");
		row.innerHTML = `
      <td><img src="${img}" width = "100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
          <a href="#" class="borrar-curso" data-id=${id}> X </a>
      </td>
    `;
		// Agregando el HTML al contenedor
		contenedorCarrito.appendChild(row);
	});
	// Agregar Carrito al Storage
	sincronizarStorage();
};

function sincronizarStorage() {
	localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//TODO            evento principal que llama todo Agregando Curso

const agregarCurso = (e) => {
	e.preventDefault();
	e.target.classList.contains("agregar-carrito") ? leerDatos(e) : null;
};

cargarEventListeners();
function cargarEventListeners() {
	// Agregando un curso al carrito tras presionar el boton "Agregar al carrito"
	listaCursos.addEventListener("click", agregarCurso);

	// Eliminando curso del carrito
	carrito.addEventListener("click", eliminarCurso);

	// Vaciar el carrito
	vaciarCarritoBtn.addEventListener("click", () => {
		limpiarCarrito();
		articulosCarrito = [];
	});
}
