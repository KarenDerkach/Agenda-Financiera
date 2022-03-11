const express = require('express')

const router = express.Router()

//const cheqTercerosRoutes = require('./cheqTerceros');
const checkbooksRoutes = require('./checkbooks');
const weatherRoutes = require('./weather');
const eventsRoutes = require('./events');

//router.use('/cheq', cheqTercerosRoutes);
router.use('/cheq', checkbooksRoutes);
router.use('/weather', weatherRoutes);
router.use('/event', eventsRoutes);



module.exports = router;