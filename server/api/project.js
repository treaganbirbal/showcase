const router = require('express').Router()
const {Project} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const data = await Project.findAll()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})
