const express = require('express')

const router = express.Router()


const checkbooksRoutes = require('./checkbooks');
const weatherRoutes = require('./weather');
const eventsRoutes = require('./events');
const authRoutes = require('./auth');
const userRoutes = require('./user');

router.use('/cheq', checkbooksRoutes);
router.use('/weather', weatherRoutes);
router.use('/event', eventsRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);


module.exports = router;