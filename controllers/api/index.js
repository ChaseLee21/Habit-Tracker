const router = require('express').Router();

const statRoutes = require('./stat-routes.js');

router.use('/stat', statRoutes);

module.exports = router;