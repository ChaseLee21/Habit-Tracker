const router = require('express').Router();
const Stat = require('../models/Stat');

// route to get all dishes
router.get('/overview', async (req, res) => {
    const statData = await Stat.findAll().catch((err) => { 
      res.json(err);
    });
    const stats = statData.map((stat) => stat.get({ plain: true }));
    res.render('overview', { stats });
  });

module.exports = router;
