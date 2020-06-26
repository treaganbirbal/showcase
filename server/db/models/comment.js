const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Comment = db.define('comments', {
  comments: {
    type: Sequelize.TEXT
  }
})

module.exports = Comment
