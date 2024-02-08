const router = require('express').Router();
const Stat = require('../../models/Stat');

// route to create/add a dish using async/await
router.post('/', async (req, res) => {
  try { 
    const statData = await Stat.create({
    name: req.body.name,
    value: req.body.value,
    person: req.body.person,
    streak: req.body.streak,
    last_date: req.body.last_date,
  });
  // if the dish is successfully created, the new response will be returned as json
  res.status(200).json(statData)
} catch (err) {
  res.status(400).json(err);
}
});


module.exports = router;
