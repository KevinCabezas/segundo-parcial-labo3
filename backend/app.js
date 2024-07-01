const cors = require('cors'); // Importa el paquete cors
const express = require('express');
const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

let planetas = [
    { id: 1, nombre: 'Mercurio', tamanio: 'pequeño', masa: '3.3e23 kg', tipo: 'rocoso', distancia: '57.9e6 km', vida: 'no tiene', anillo: 'no tiene', composicion: 'hierro, níquel' },
    { id: 2, nombre: 'Venus', tamanio: 'mediano', masa: '4.87e24 kg', tipo: 'rocoso', distancia: '108.2e6 km', vida: 'no tiene', anillo: 'no tiene', composicion: 'roca y metal' },
    { id: 3, nombre: 'Tierra', tamanio: 'mediano', masa: '5.97e24 kg', tipo: 'rocoso', distancia: '149.6e6 km', vida: 'tiene', anillo: 'no tiene', composicion: 'silicatos, agua' }
];

// Middleware para simular una demora de 3 segundos
const simulateDelay = (req, res, next) => {
    setTimeout(next, 3000);
};

/**
 * Obtiene todos los Planetas
 */
app.get('/planetas', simulateDelay, (req, res) => {
    res.json(planetas);
});

/**
 * Crea un nuevo Planeta
 */
app.post('/planetas', simulateDelay, (req, res) => {
    const nuevoPlaneta = req.body;
    nuevoPlaneta.id = planetas.length + 1;
    planetas.push(nuevoPlaneta);
    res.status(200).json(nuevoPlaneta);
});

/**
 * Obtiene Planeta por ID
 */
app.get('/planetas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const planeta = planetas.find(p => p.id === id);
    if (planeta) {
        res.json(planeta);
    } else {
        res.status(404).send('Planeta no encontrado');
    }
});

/**
 * Edita Planeta por ID
 */
app.put('/planetas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = planetas.findIndex(p => p.id === id);
    if (index !== -1) {
        const nuevoObj = req.body;
        nuevoObj.id = id;
        planetas[index] = nuevoObj;
        res.json(nuevoObj);
    } else {
        res.status(404).send('Planeta no encontrado');
    }
});

/**
 * Elimina Planeta por ID
 */
app.delete('/planetas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = planetas.findIndex(p => p.id === id);
    if (index !== -1) {
        planetas.splice(index, 1);
        res.status(200).send();
    } else {
        res.status(404).send('Planeta no encontrado');
    }
});

/**
 * Elimina todos los Planetas
 */
app.delete('/planetas', simulateDelay, (req, res) => {
    planetas = [];
    res.status(200).send('Todos los planetas han sido eliminados');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
