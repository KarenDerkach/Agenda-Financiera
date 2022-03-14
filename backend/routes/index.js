const express = require('express')

const router = express.Router()


const checkbooksRoutes = require('./checkbooks');
const weatherRoutes = require('./weather');
const eventsRoutes = require('./events');
// const frontendRoute = require('./frontend');

router.use('/cheq', checkbooksRoutes);
router.use('/weather', weatherRoutes);
router.use('/event', eventsRoutes);

// router.use('/', frontendRoute);

module.exports = router;