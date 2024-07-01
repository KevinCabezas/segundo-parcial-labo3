import { mostrarSpinner, ocultarSpinner } from "./spinner.js";

const ENDPOINT = "http://localhost:3000/planetas";

export function obtenerTodos() {
  // mostrarSpinner();
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        ocultarSpinner();
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });
    mostrarSpinner();
    xhr.open("GET", `${ENDPOINT}`);
    xhr.send();
    // ocultarSpinner();
  });
}

export function addOne(objeto) {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        ocultarSpinner();
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        }
        else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });

    mostrarSpinner();
    xhr.open("POST", `${ENDPOINT}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(objeto));
  });
}

// Delete All--------------------------------------------------------

export function deleteAll() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        ocultarSpinner();
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });
    mostrarSpinner();

    xhr.open("DELETE", `${ENDPOINT}`);
    xhr.send();
  });
}

// Eliminar uno----------------------------------------------

export function deleteOne(objeto) {
  return new Promise((resolve, reject) => {

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      //agregamos el manejador de eventos
      if (xhr.readyState == 4) {
        ocultarSpinner();
        // Petición finalizada
        if (xhr.status == 200) {
          // respuesta del servidor si actualiza con exito
          resolve("Eliminado con exito");
        } else {
          // falló algo
          reject("ERR " + xhr.status + " :" + xhr.statusText);
        }
      }
    });
    mostrarSpinner();
    xhr.open("DELETE", `${ENDPOINT}/${objeto.id}`);

    xhr.send(); // lo convierto a un json string
  });
}

  // MODIFICAR UNO---------------------------------------

export function editOne(objeto) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      //agregamos el manejador de eventos
      if (xhr.readyState == 4) {
        mostrarSpinner();
        // Petición finalizada
        if (xhr.status == 200) {
          // respuesta del servidor si actualiza con exito
          resolve("Actualizado con exito");
        } else {
          // falló algo
          reject("ERR " + xhr.status + " :" + xhr.statusText);
        }
      }
    });
    ocultarSpinner();
    // Ahora los datos lo pasamos via PUT, debido a que estamos por agregar/manipular el contenido del backend
    // debemos aclarar el tipo de dato que va a viajar en el cuerpo de la peticion
    xhr.open("PUT", `${ENDPOINT}/${objeto.id}`);
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(JSON.stringify(objeto)); // lo convierto a un json string
  });
}

export function getOne(id) {
  return new Promise((resolve, reject) => {

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      //agregamos el manejador de eventos
      if (xhr.readyState == 4) {
        // Petición finalizada
        ocultarSpinner();
        if (xhr.status == 200) {
          // respuesta del servidor si actualiza con exito
          const obj = JSON.parse(xhr.responseText);
          resolve(obj);
          // console.log(obj);
        } else {
          // falló algo
          reject("ERR " + xhr.status + " :" + xhr.statusText);
        }
      }
    });
    mostrarSpinner();
    xhr.open("GET", `${ENDPOINT}/${id}`);

    xhr.send(); // lo convierto a un json string
  });

}

export async function getAllFetch() {
  mostrarSpinner();
  const options = {
    method: "GET",
    headers: { "content-type": "application/json" },
  };

  let res = await fetch(`${ENDPOINT}`, options);
  res = await res.json();

  console.log(res);
  ocultarSpinner();
}

export async function getOneFetch(id) {
  mostrarSpinner();
  const options = {
    method: "GET",
    headers: { "content-type": "application/json" },
  };

  let res = await fetch(`${ENDPOINT}/${id}`, options);
  res = await res.json();

  console.log(res);
  ocultarSpinner();
}

export async function addOneFetch(model) {
  mostrarSpinner();
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(model),
  };

  let res = await fetch(`${ENDPOINT}`, options);
  res = await res.json();

  console.log(res);
  console.log("Agregado con Exito");
  ocultarSpinner();
}

export async function editOneFetch(model) {
  mostrarSpinner();
  const options = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(model),
  };

  let res = await fetch(`${ENDPOINT}/${model.id}`, options);
  console.log(res);
  console.log("Actualizado con Exito");
  ocultarSpinner();
}

export async function deleteOneFetch(id) {
  mostrarSpinner();
  const options = {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  };

  let res = await fetch(`${ENDPOINT}/${model.id}`, options);
  console.log(res);
  console.log("Eliminado con Exito");
  ocultarSpinner();
}

