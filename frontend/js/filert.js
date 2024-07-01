
// export function filtrarLista(lista, clave) {
//     const listaFiltrada = lista.filter(item => {
//         return item[clave] == valor;
//     }); 
//     return listaFiltrada;
// }

// // Función para filtrar la lista basada en una clave y un valor
export function filtrarLista(lista, valor) {
    const listaFiltrada = lista.filter(item => {
        return item.tipo === valor;
    });
    return listaFiltrada;
}

export function listaMapeadaDos(lista) {
    const listaMapeada = lista.map(item => {
        return {
            id: item.id,
            nombre: item.nombre,
            tamanio: item.tamanio,
            masa: item.masa,
            tipo: item.tipo.toLowerCase(), // convertir a minúsculas
            distancia: item.distanciaAlSol,
            vida: item.presenciaVida ? "tiene" : "no tiene",
            anillo: item.poseeAnillo ? "tiene" : "no tiene",
            composicion: item.composicionAtmosferica
        };
    });
    return listaMapeada;
}

export function listaMapeada(lista) {
    const listaMapeada = lista.map(item => {
        item.vida = item.vida ? "tiene" : "no tiene"; 
        item.anillo = item.anillo ? "tiene" : "no tiene"; 
        return item
    });
    return listaMapeada;
}

export function promedioDistanciaTipo(lista, tipo) {
    // Filtrar lista por tipo
    const listaFiltrados = lista.filter(planeta => planeta.tipo === tipo);

    // Extraer distancias y convertirlas a números
    const distancias = listaFiltrados.map(planeta => parseFloat(planeta.distancia));

    // Calcular el promedio de las distancias
    const sumaDistancias = distancias.reduce((sum, distancia) => sum + distancia, 0);
    const promedio = distancias.length ? sumaDistancias / distancias.length : 0;

    return promedio;
}

export function promedioDatos(lista, clave ,valor) {
    console.log(lista);
    
    switch (clave) {
        case "tamanio":
            const sumaTamanio = lista.reduce((acc, planeta) => acc + (planeta.tamanio == valor ? 1 : 0), 0);
            const promedioTamanio = (sumaTamanio / lista.length).toFixed(2);
            return `promedio de planetas que son ${valor}s: ${promedioTamanio}`;
        case "masa":
            const sumaMasa = lista.reduce((acc, planeta) => acc + parseFloat(planeta.masa), 0);
            const promedioMasa = (sumaMasa / lista.length).toFixed(2);
            return `Promedio ${clave}: ${promedioMasa}`;

        case "tipo":
            const sumaTipo = lista.reduce((acc, planeta) => acc + (planeta.tipo == valor ? 1 : 0), 0);
            const promedioTipo = (sumaTipo / lista.length).toFixed(2);
            return `promedio de planetas que son ${valor}s: ${promedioTipo}`;
                
        case "distancia":
            const sumaDistancia = lista.reduce((acc, planeta) => acc + parseFloat(planeta.distancia), 0);
            const promedioDistancia = (sumaDistancia / lista.length).toFixed(2);
            return `Promedio ${clave}: ${promedioDistancia}`;
            
        case "vida":
            const sumaVida = lista.reduce((acc, planeta) => acc + (planeta.vida == valor ? 1 : 0), 0);
            const promedioVida = (sumaVida / lista.length).toFixed(2);
            return `promedio de planetas que ${valor}n vida: ${promedioVida}`;
           
        case "anillo":
            const sumaAnillo = lista.reduce((acc, planeta) => acc + (planeta.anillo == valor ? 1 : 0), 0);
            const promedioAnillo = (sumaAnillo / lista.length).toFixed(2);
            return `promedio de planetas que ${valor}n ${clave}: ${promedioAnillo}`;
           
        
    }
}