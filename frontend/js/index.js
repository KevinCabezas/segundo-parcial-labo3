import { Planeta } from "./planeta.js";
// import { leer, escribir, limpiar, jsonToObject, objectToJson } from "./local-storage-async.js";
import { obtenerTodos, addOne, editOne, deleteOne, deleteAll, getOne } from "./api.js";
import { editOneFetch, getOneFetch } from "./api.js";
import { mostrarSpinner, ocultarSpinner } from "./spinner.js";
import { filtrarLista, listaMapeada, promedioDatos} from "./filert.js";
import { controlerColumns, actualizarVisibilidadColumnas } from "./controlerColum.js";
// import { get } from "http";
const KEY_STORAGE = "planetas";
const items = [];
let idObjeto = 0;

const selectCol = [];

const formulario = document.getElementById("form-item");

const nombre = formulario.querySelector("#nombre");
const tamanio = formulario.querySelector("#tamanio");
const masa = formulario.querySelector("#masa");
const tipo = formulario.querySelector("#tipo");
const distancia = formulario.querySelector("#distancia");
const vida = formulario.querySelector("#vida");
const anillo = formulario.querySelector("#anillo");
const composicion = formulario.querySelector("#composicion");


const columnas = document.getElementById("check-col");
const nombreColumna = columnas.querySelector("#nombre-col");
const tamanioColumna = columnas.querySelector("#tamanio-col");
const masaColumna = columnas.querySelector("#masa-col");
const tipoColumna = columnas.querySelector("#tipo-col");
const distanciaColumna = columnas.querySelector("#distancia-col");
const vidaColumna = columnas.querySelector("#vida-col");
const anilloColumna = columnas.querySelector("#anillo-col");
const composicionColumna = columnas.querySelector("#composicion-col");

const formularioFiltro = document.getElementById("form-filter");
const operacion = formularioFiltro.querySelector("#operacion");
const dato = formularioFiltro.querySelector("#dato");
const textoPromedio = formularioFiltro.querySelector('#promedio');

const formBuscar = document.getElementById("form-buscar");
const idIngresado = formBuscar.querySelector("#buscar-btn");


document.addEventListener("DOMContentLoaded", onInit); 

function onInit() {
  
  escuchandoFormulario();
  escuchandoBtnDeleteAll();
  botonCancelarPrincipal();
  botonModificar();
  botonEliminar();
  botonCancelarEdicion();
  loadItems();

  // allColumnSelect();

  // initializeColumnVisibility();
  obtenerDatosFilter();
  // mangeColumn();
  // actualizarVisibilidadColumnas();
  controlerColumns();
  buscarPorId();

}

async function loadItems() {
  // let str = await leer(KEY_STORAGE);
  // mostrarSpinner();
  let str = await obtenerTodos();
  // ocultarSpinner();
  const objetos = str || [];

  // items.length = 0
  objetos.forEach(obj => {
    const model = new Planeta(
      obj.id,
      obj.nombre,
      obj.tamanio,
      obj.masa,
      obj.tipo,
      obj.distancia,
      obj.vida,
      obj.anillo,
      obj.composicion,
    );

    items.push(model);
  });

  
  rellenarTabla(listaMapeada(items));
  // mostrarPromedio();
  // console.log(promedioDatos(items))

}

function mostrarPromedio() {

  console.log(textoPromedio.textContent)
  textoPromedio.textContent = promedioDatos(items, operacion.value, dato.value);
  
  // Modifica el texto del label
  // label.textContent = "Nuevo texto del label";
}

function obtenerDatosFilter() {
  formularioFiltro.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(operacion.value);
    // dato.value;
    let listaFiltrada = filtrarLista(items, operacion.value, dato.value);
    // items.length = 0;
    console.log(listaFiltrada);
    // items.push(...listaFiltrada);
    // loadItems();
    rellenarTabla(listaFiltrada);
    mostrarPromedio();

    
  });
}

function buscarPorId() {
  formBuscar.addEventListener("submit", (e) => {
    e.preventDefault();
    // const objeto = getOne(idIngresado.value);

    // console.log(objeto[1])

    getOne(idIngresado.value).then(objeto => {
      nombre.value = objeto.nombre;
      tamanio.value = objeto.tamanio;
      masa.value = objeto.masa;
      tipo.value = objeto.tipo;
      distancia.value = objeto.distancia
      vida.checked = objeto.vida;
      anillo.checked = objeto.anillo;
      composicion.value = objeto.composicion;
      idObjeto = objeto.id;

      console.log(objeto.nombre); // Aquí tienes el objeto
      // Puedes hacer lo que necesites con el objeto
    })
    // console.log(getOneFetch(idIngresado.value));
    // console.log(idIngresado.value);
    // console.log(getOne(idIngresado.value));
    mostrarEditar('flex');
    mostrarBotonesForm('none');
    
  });
}

function rellenarTabla(listaItems) {
  const tabla = document.getElementById("table-items-c");
  let tbody = tabla.getElementsByTagName('tbody')[0];

  tbody.innerHTML = '';

  const celdas = ["id", "nombre", "tamanio", "masa", "tipo", "distancia", "vida", "anillo", "composicion"];
  // consol.log(listaItems)
  listaItems.forEach((item, indice) => {
    let nuevaFila = document.createElement("tr");
    nuevaFila.id = `row-${indice}`;
    celdas.forEach((celda) => {
      let nuevaCelda = document.createElement("td");
      nuevaCelda.textContent = item[celda];

      nuevaFila.appendChild(nuevaCelda);
    });
   
    tbody.appendChild(nuevaFila);

  });

  tbody.addEventListener('click', function (event) {
    const fila = event.target.closest('tr');
    if (fila) {
      bucarObjetoClickFila(fila);
    }
  });

  actualizarVisibilidadColumnas();
}

async function escuchandoFormulario() {
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    // let vidaCheck = vida.checked ? "tiene" : "no tiene";
    // let anilloCheck = anillo.checked ? "tiene" : "no tiene";
    var fechaActual = new Date();
    let id = asignarId();
    // let id = fechaActual.getTime();

    const model = new Planeta(
      id,
      nombre.value,
      tamanio.value,
      masa.value,
      tipo.value,
      distancia.value,
      vida.checked,
      anillo.checked,
      // vidaCheck,
      // anilloCheck,
      composicion.value
    );
    
    const respuesta = model.verify();
    
    if (respuesta.success) {
      items.push(model);
      // mostrarSpinner();
      await addOne(model);
      // ocultarSpinner();
      // loadItems();
      rellenarTabla(listaMapeada(items));
      limpiarFormulario();
    }
    else {
      alert(respuesta.rta);
      if (respuesta.campo === 'distancia') {
        distancia.value = '';
      } else if (respuesta.campo === 'tamanio') {
        tamanio.value = '';
      }
    }
  });
}

function actualizarListaObjetos() {
  // const str = items;
  // mostrarSpinner();
  // await escribir(KEY_STORAGE, str);
  // await addOne(model)
  // ocultarSpinner();
  // loadItems();
  rellenarTabla(items);
  mostrarBotonesForm('flex');
  mostrarEditar('none');
}

function actulizarId() {
  items.forEach((ite, indice) => {
    ite.id = indice + 1;
  });
}

function asignarId() {
  let ultimoId;
  if (items.length === 0) {
    ultimoId = 1;
  } else {
    ultimoId = items.length + 1;
  }
  return ultimoId;
  // return "00" + ultimoId;
}

function limpiarFormulario() {
  formulario.reset();
  formBuscar.reset();
}


async function escuchandoBtnDeleteAll() {
  const btn = document.getElementById("btn-delete-all");

  btn.addEventListener("click", async (e) => {
    if (items.length > 0) {
      const rta = confirm('Desea eliminar todos los Items?');
      if (rta) {
        await deleteAll();
      
      } 
      items.splice(0, items.length);
      rellenarTabla();
    }
    else {
      alert("lista vacia");
    }
  });
}


function bucarObjetoClickFila(fila) {

  const datos = Array.from(fila.cells).map(cell => cell.innerText);
  nombre.value = datos[1];
  tamanio.value = datos[2];
  masa.value = datos[3];
  tipo.value = datos[4];
  distancia.value = datos[5];
  vida.checked = datos[6] === "tiene";
  anillo.checked = datos[7] === "tiene";
  composicion.value = datos[8];
  idObjeto = datos[0];
  mostrarEditar('flex');
  mostrarBotonesForm('none');
}

async function eliminarObjetoDeLista() {
  let objeto = items.find(ite => ite.id == idObjeto);
  
  if (objeto) {
    const rta = confirm('Sea eliminar el elemento: ' + idObjeto);
    if (rta) {
      await deleteOne(objeto);
      // items.splice(0, items.length);
      // loadItems();
      // items.splice(idObjeto-1, 1);
      // rellenarTabla(items);

      actulizarId();
      mostrarBotonesForm('flex');
      mostrarEditar('none');

    }
    else {
      mostrarEditar('flex');
      mostrarBotonesForm('flex');
    }
  }
  else {
    alert("Haga click sobre la fila deseada")
  }
  items.splice(idObjeto-1, 1);
  rellenarTabla(items);
}


function modificarObjeto() {
  let objeto = items.find(ite => ite.id == idObjeto);
  
  if (!objeto) {
    alert("Haga click sobre la fila deseada");
    return;
  }

  if (!validarCamposVacios()) {
    alert("no se puede modificar con campos vacios");
    return;
  }

  if (!confirm('Se modificara el elemento: ' + idObjeto)) {
    limpiarFormulario();
    inicializarIdSeleccionado();

    return;
  }
  
  let vidaCheck = vida.checked ? "tiene" : "no tiene";
  let anilloCheck = anillo.checked ? "tiene" : "no tiene";
  
  actualizarObjeto(objeto, vidaCheck, anilloCheck);
  // actualizarListaObjetos();
  limpiarFormulario();
  inicializarIdSeleccionado();
  mostrarBotonesForm('flex');
  // editOne(objeto);
}

function actualizarObjeto(objeto, vidaCheck, anilloCheck) {
  // objeto.id = idObjeto;
  objeto.nombre = nombre.value;
  objeto.tamanio = tamanio.value;
  objeto.masa = masa.value;
  objeto.tipo = tipo.value;
  objeto.distancia = distancia.value;
  objeto.vida = vidaCheck;
  objeto.anillo = anilloCheck;
  objeto.composicion = composicion.value;
  // editOne(objeto);
  editOneFetch(objeto)
}


function validarCamposVacios() {
  if(!nombre.value || !tamanio.value || !masa.value || !distancia.value || !composicion.value) {
    return false;
  }
  else {
    return true;
  }
}



function botonCancelarPrincipal() {
  const btn = document.getElementById("buton-cancel");
  btn.addEventListener("click", () => {
    limpiarFormulario();
  });
}

function botonModificar() {
  const btn = document.getElementById("btn-modificar");
  btn.addEventListener("click", () => {
    modificarObjeto();
    rellenarTabla(items)
    // editOne()
  });

}

function botonEliminar() {
  const btn = document.getElementById("btn-eliminar");
  btn.addEventListener("click", () => {
    eliminarObjetoDeLista();
    limpiarFormulario();
    inicializarIdSeleccionado();
  });

}

function mostrarEditar(style) {
  const editar = document.getElementById('editar');
  editar.style.display = style;
}

function inicializarIdSeleccionado() {
  idObjeto = 0;
  mostrarBotonesForm('flex');

}

function mostrarBotonesForm(style) {
  const btn = document.getElementById('btn-principal');
  btn.style.display = style;
}

function botonCancelarEdicion() {
  const btn = document.getElementById("buton-cancelar");
  btn.addEventListener("click", () => {
    limpiarFormulario();
    mostrarBotonesForm('flex');
    mostrarEditar('none');
  });

}