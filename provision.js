// Provisions your domain with some sample data
// You need a orgUnit '/demo' to work
const gAdmin = require('./index')
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)
const base64url = require('base64url')
const conf = require('./config')
const main = async () => {
  try {
    // Sample data
    const users = [
      {
        email: 'john.doe@example.com',
        password: 'Pa55word',
        firstName: 'John',
        lastName: 'Doe',
        orgUnitPath: '/demo'
      },
      {
        email: 'jane.roe@example.com',
        password: 'Pa55word',
        firstName: 'Jane',
        lastName: 'Roe',
        orgUnitPath: '/demo'
      },
      {
        email: 'james.doe@example.com',
        password: 'Pa55word',
        firstName: 'James',
        lastName: 'Doe',
        orgUnitPath: '/demo'
      }
    ]
    const groups = [
      {
        email: 'demoGroup1@example.com',
        name: 'demo1',
        description: 'Demo group 1'
      },
      {
        email: 'demoGroup2@example.com',
        name: 'demo2',
        description: 'Demo group 2'
      },
      {
        email: 'demoGroup1a@example.com',
        name: 'demo1a',
        description: 'Demo group 1a, subgroup of demoGroup1@example.com'
      }
    ]
    // Initialize
    await gAdmin.init(conf)

    // Create Groups
    for (const group of groups) {
      try {
        await gAdmin.createGroup(group)
      } catch (err) {
        console.log(err)
      }
    }

    // Make 1a subgroup of 1
    try {
      await gAdmin.addGroupToGroup({
        groupKey: 'demoGroup1@example.com',
        email: 'demoGroup1a@example.com'
      })
    } catch (err) {
      console.log(err)
    }

    // Create Users
    for (const user of users) {
      try {
        // Create
        await gAdmin.createUser(user)
        // Set photo
        const photoData = base64url(await readFile(`./assets/${user.email}.jpeg`))
        await gAdmin.setUserPhoto({ userKey: user.email, photoData: photoData })
        // // Add to group 1
        await gAdmin.addUserToGroup({ groupKey: 'demoGroup1@example.com', email: user.email })
      } catch (err) {
        console.log(err)
      }
    }
  } catch (e) {
    console.log(e)
  }
}
main().catch(console.error)
