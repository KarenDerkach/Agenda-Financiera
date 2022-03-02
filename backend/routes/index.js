const express = require('express')

const router = express.Router()

const cheqTercerosRoutes = require('./cheqTerceros');
const cheqPropioRoutes = require('./cheqPropio');
const weatherRoutes = require('./weather')

router.use('/cheq', cheqTercerosRoutes);
router.use('/cheqPropio', cheqPropioRoutes);
router.use('/weather', weatherRoutes)



module.exports = router;