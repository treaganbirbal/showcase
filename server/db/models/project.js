const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('projects', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contributors: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmXf3Eez6CZ-ILO9-YhC3qlZpkzSOf5p3qfg&usqp=CAU'
  },
  link: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Project
