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
  }
})

module.exports = Project
