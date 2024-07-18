const router = require('express').Router()
const userController = require('./userController')
const habitController = require('./habitController')
const weekController = require('./weekController')
const dayController = require('./dayController')
const authController = require('./authController')

router.use('/', authController)
router.use('/users', userController)
router.use('/habits', habitController)
router.use('/weeks', weekController)
router.use('/days', dayController)

module.exports = router
