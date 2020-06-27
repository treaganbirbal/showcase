const User = require('./user')
const Project = require('./project')
const Comment = require('./comment')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Comment)
Project.hasMany(Comment)
User.hasMany(Project)
Project.belongsTo(User)
Comment.belongsTo(Project)
Comment.belongsToMany(Project, {through: 'Project_Comments'})
Comment.belongsToMany(User, {through: 'User_Comments'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Project,
  Comment
}
