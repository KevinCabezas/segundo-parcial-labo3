import { Planeta } from "./planeta.js";
import { obtenerTodos, addOne, editOne, deleteOne, deleteAll, getOne } from "./api.js";
import { editOneFetch, getOneFetch } from "./api.js";
import { filtrarLista, listaMapeada, listaMapeadaDos, promedioDatos, promedioDistanciaTipo} from "./filert.js";
const items = [];
let idObjeto = 0;


const formulario = document.getElementById("form-item");

const nombre = formulario.querySelector("#nombre");
const tamanio = formulario.querySelector("#tamanio");
const masa = formulario.querySelector("#masa");
const tipo = formulario.querySelector("#tipo");
const distancia = formulario.querySelector("#distancia");
const vida = formulario.querySelector("#vida");
const anillo = formulario.querySelector("#anillo");
const composicion = formulario.querySelector("#composicion");


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


  obtenerDatosFilter();
  controlerColumns();
  buscarPorId();

  botonFinalizar();
}

async function loadItems() {
  let listMapeada = await obtenerTodos();
  let str = listaMapeadaDos(listMapeada)
  console.log(str);
  const objetos = str || [];

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
  
}

function mostrarPromedio() {

  textoPromedio.textContent = promedioDistanciaTipo(items, operacion.value)
}

function obtenerDatosFilter() {
  formularioFiltro.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(operacion.value);
    let listaFiltrada = filtrarLista(items, operacion.value);
    console.log(listaFiltrada);

    rellenarTabla(listaFiltrada);
    mostrarPromedio();

    
  });
}

function buscarPorId() {
  formBuscar.addEventListener("submit", (e) => {
    e.preventDefault();

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

    })
  
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

    
    var fechaActual = new Date();
    let id = asignarId();

    const model = new Planeta(
      id,
      nombre.value,
      tamanio.value,
      masa.value,
      tipo.value,
      distancia.value,
      vida.checked,
      anillo.checked,
      composicion.value
    );
    
    const respuesta = model.verify();
    
    if (respuesta.success) {
      items.push(model);
      await addOne(model);
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
  limpiarFormulario();
  inicializarIdSeleccionado();
  mostrarBotonesForm('flex');
}

function actualizarObjeto(objeto, vidaCheck, anilloCheck) {
  objeto.nombre = nombre.value;
  objeto.tamanio = tamanio.value;
  objeto.masa = masa.value;
  objeto.tipo = tipo.value;
  objeto.distancia = distancia.value;
  objeto.vida = vidaCheck;
  objeto.anillo = anilloCheck;
  objeto.composicion = composicion.value;
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

function ocultarFormFilter(style) {
  const elemento = document.querySelector('.container-filter');
  elemento.style.display = style;
}

function botonFinalizar() {
  const btn = document.getElementById("buton-finalizar");
  btn.addEventListener("click", () => {

    ocultarFormFilter('none');
    console.log("entro");
  });
  ;
}