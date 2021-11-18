const { Router } = require('express');
const dogsRoute = require('./Dogs')
const temperamentsRoute = require('./Temperaments')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRoute);
router.use('/temperament', temperamentsRoute);

module.exports = router;
