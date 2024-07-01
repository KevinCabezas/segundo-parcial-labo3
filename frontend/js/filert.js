
export function filtrarLista(lista, clave, valor) {
    const listaFiltrada = lista.filter(item => {
        return item[clave] == valor;
    }); 
    return listaFiltrada;
}

export function listaMapeada(lista) {
    const listaMapeada = lista.map(item => {
        item.vida = item.vida ? "tiene" : "no tiene"; 
        item.anillo = item.anillo ? "tiene" : "no tiene"; 
        return item
    });
    return listaMapeada;
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