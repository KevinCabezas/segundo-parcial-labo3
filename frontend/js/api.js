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
      if (xhr.readyState == 4) {
        ocultarSpinner();
        if (xhr.status == 200) {
          resolve("Eliminado con exito");
        } else {
          reject("ERR " + xhr.status + " :" + xhr.statusText);
        }
      }
    });
    mostrarSpinner();
    xhr.open("DELETE", `${ENDPOINT}/${objeto.id}`);

    xhr.send();
  });
}

  // MODIFICAR UNO---------------------------------------

export function editOne(objeto) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState == 4) {
        mostrarSpinner();
        if (xhr.status == 200) {
          resolve("Actualizado con exito");
        } else {
          reject("ERR " + xhr.status + " :" + xhr.statusText);
        }
      }
    });
    ocultarSpinner();
    xhr.open("PUT", `${ENDPOINT}/${objeto.id}`);
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(JSON.stringify(objeto)); 
  });
}

export function getOne(id) {
  return new Promise((resolve, reject) => {

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState == 4) {
        ocultarSpinner();
        if (xhr.status == 200) {
          const obj = JSON.parse(xhr.responseText);
          resolve(obj);
        } else {
          reject("ERR " + xhr.status + " :" + xhr.statusText);
        }
      }
    });
    mostrarSpinner();
    xhr.open("GET", `${ENDPOINT}/${id}`);

    xhr.send(); 
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

