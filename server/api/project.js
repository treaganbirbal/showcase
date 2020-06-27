const router = require('express').Router()
const {Project, User, Comment} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const data = await Project.findAll({include: {model: User}})
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let projectId = req.params.id
    const singleProject = await Project.findByPk(
      projectId,
      {include: [{model: User}, {model: Comment}]},
      {
        attributes: [
          'name',
          'description',
          'contributors',
          'likes',
          'imageUrl',
          'likes',
          'userId',
          'userName',
          'comments'
        ]
      }
    )
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
      userId: 1,
      imageUrl: req.body.imageUrl
    })
    res.json({
      message: 'Project Created Successfully',
      project: newProject
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const projectId = req.params.id
    await Project.update(
      {
        name: req.body.name,
        description: req.body.description,
        constributors: req.body.constributors,
        likes: req.body.likes,
        userId: req.body.userId,
        imageUrl: req.body.imageUrl
      },
      {
        where: {
          id: projectId
        }
      }
    )
    if (!projectId) {
      res.sendStatus(500)
    } else {
      const updatedProject = await Project.findOne({
        where: {id: projectId}
      })
      res.json({
        message: 'Project updated successfully',
        project: updatedProject
      })
    }
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const projectId = req.params.id
    const project = await Project.findOne({
      where: {
        id: projectId
      }
    })
    if (project) {
      Project.destroy({
        where: {
          id: projectId
        }
      })
      res.json({
        message: 'Project deleted successfully'
      })
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log(error)
  }
})
