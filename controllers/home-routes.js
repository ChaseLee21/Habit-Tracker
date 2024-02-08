const router = require('express').Router();
const Stat = require('../models/Stat');

// route to get all dishes
router.get('/', async (req, res) => {
    const statData = await Stat.findAll().catch((err) => { 
      res.json(err);
    });
    const stats = statData.map((stat) => stat.get({ plain: true }));
    res.render('all', { stats });
  });

// route to get one dish
router.get('/stat/:id', async (req, res) => {
  try{ 
      const statData = await Stat.findByPk(req.params.id);
      if(!statData) {
          res.status(404).json({message: 'No stat found with this id!'});
          return;
      }
      const stat = statData.get({ plain: true });
      res.render('stat', stat);
    } catch (err) {
        res.status(500).json(err);
    };     
});

module.exports = router;
