const router = require('express').Router()
const {Comment, User, Project} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const data = await Comment.findAll({
      include: [{model: User}, {model: Project}]
    })
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.comment,
      userId: req.user.id,
      projectId: req.body.projectId
    })
    res.status(204).json({
      message: 'new commment added successfully',
      comment: newComment
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const commentId = req.params.id
    await Comment.update(
      {
        comment: req.body.comment
      },
      {where: {id: commentId}}
    )
    if (!commentId) {
      res.sendStatus(500)
    }
    const comment = await Comment.findOne({
      where: {id: commentId}
    })
    res.status(204).json({
      message: 'comment updated succesfully',
      comment: comment
    })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const commentId = req.params.id
    Comment.destroy({
      where: {
        id: commentId
      }
    })
    res.json({
      message: 'comment deleted successfully'
    })
  } catch (error) {
    next(error)
  }
})
