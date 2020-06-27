const router = require('express').Router()
const {User, Project} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'userName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await User.findAll({
      where: {id: userId},
      include: [{model: Project}]
    })
    if (!user) {
      res.sendStatus(404)
    } else {
      res.status(200).json(user)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    await await User.update(
      {
        email: req.user.email,
        password: req.user.password,
        userName: req.user.userName
      },
      {
        where: {id: userId}
      }
    )
    if (!userId) {
      res.sendStatus(500)
    } else {
      const user = await User.findOne({
        where: {id: userId}
      })
      res.json({
        message: 'Update Successful',
        user: user
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = User.findOne({where: {id: userId}})
    if (user) {
      await User.destroy({
        where: {
          id: userId
        }
      })
      res.send('User was Deleted')
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
