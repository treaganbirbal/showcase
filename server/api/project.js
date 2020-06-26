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

router.get('/:id', async (req, res, next) => {
  try {
    let projectId = req.params.id
    const singleProject = await Project.findByPk(projectId)
    if (!singleProject) {
      res.status(404).json('No Project Found')
    } else {
      res.status(200).json(singleProject)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProject = await Project.create({
      name: req.body.name,
      description: req.body.description,
      contributors: [1],
      likes: req.body.likes,
      userId: 1
    })
    res.json({
      message: 'Project Created Successfully',
      project: newProject
    })
  } catch (error) {
    next(error)
  }
})
