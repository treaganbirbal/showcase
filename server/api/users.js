const router = require('express').Router()
const {User, Project} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
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
    console.log(error)
  }
})
