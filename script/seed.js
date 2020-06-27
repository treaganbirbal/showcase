'use strict'

const db = require('../server/db')
const {User, Project, Comment} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', userName: 'cody'}),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      userName: 'murphy'
    }),
    User.create({email: 'trey@gmail.com', password: '123', userName: 'trey'})
  ])

  const projects = await Promise.all([
    Project.create({
      name: 'Waitor',
      description: 'Social platform to never eat alone',
      contributors: [2],
      likes: 3,
      userId: 3
    }),
    Project.create({
      name: 'DiffRent',
      description: 'Platform for Landlords & Tenants to communicate',
      contributors: [],
      likes: 10,
      userId: 3,
      link: 'https://diff-rent.herokuapp.com/'
    }),
    Project.create({
      name: 'ShopX',
      description: 'Book new experiences',
      contributors: [],
      likes: 10,
      userId: 3,
      link: 'http://shop-x.herokuapp.com/'
    }),
    Project.create({
      name: 'HikeMe!',
      description: 'Find a hiking trail near you',
      contributors: [],
      likes: 5,
      userId: 3,
      link: 'http://hikeme.herokuapp.com/'
    })
  ])

  const comments = await Promise.all([
    Comment.create({
      comment: 'That is a really great app!',
      userId: 2,
      projectId: 1
    }),
    Comment.create({
      comment: 'What do you plan to do further',
      userId: 1,
      projectId: 2
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeeded ${projects.length} projects`)
  console.log(`seeded ${comments.length} comments`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
