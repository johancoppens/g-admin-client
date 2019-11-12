# g-admin-client

The Google Admin Client (g-admin-client) is a module with the aim of making it easier to manage <b>users</b>, <b>groups</b> and <b>groups settings</b> in a G Suite domain with [Node.js](https://nodejs.org/). It is built on top of the official [google-api-nodejs-client](https://www.npmjs.com/package/googleapis).

## Installation

```bash
$ npm install --save github:johancoppens/g-admin-client
```

## Domain configuration

This module needs a Service Account configured on your domain. You can find here how to do this: [Perform G Suite Domain-Wide Delegation of Authority](https://developers.google.com/admin-sdk/directory/v1/guides/delegation).

The things you need to do:
* Save the generated keyfile somewhere in a safe place from where you can access it from your script.
* In Step 6 of "In the One or More API Scopes field enter the scopes required for your application" paste in these API scopes (comma separated list): https://www.googleapis.com/auth/admin.directory.user,
https://www.googleapis.com/auth/admin.directory.user.readonly,
https://www.googleapis.com/auth/admin.directory.group,
https://www.googleapis.com/auth/admin.directory.group.readonly,
https://www.googleapis.com/auth/admin.directory.group.member,
https://www.googleapis.com/auth/apps.groups.settings,
https://www.googleapis.com/auth/admin.directory.orgunit,
https://www.googleapis.com/auth/admin.directory.orgunit.readonly
* A domain user who has access to the Admin SDK Directory API. Additionally, the user must have logged in at least once and accepted the G Suite Terms of Service.

## Usage

### Most basic Usage

```javascript
const gAdmin = require('g-admin-client')
const main = async () => {
  try {
    // Initialize
    await gAdmin.init({
      keyFile: './key/<your_key_file>.json', // See README.md
      gSuiteAdminAccount: 'admin@example.com',
      domain: 'example.com'
    })

    const res = await gAdmin.createUser({
      firstName: 'John',
      surName: 'Doe',
      password: 'Pa55word',
      email: 'john.doe@example.com'
    })
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}
main().catch(console.error)
```

### More Advanced

```javascript
// Provisions your domain with some sample data
// You need a orgUnit '/demo' to work
const gAdmin = require('./index')
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)
const base64url = require('base64url')
const conf = require('./config') // external config file
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

```
### More Examples

[example.js](./example.js)

## Docs
Here: [api.md](api.md)

## Why

* Simple configuration.
* The needed scopes are internaly configured for you.
* No need for you to handle pagination which is also handled internaly. Watch out for too big datasets!
* Handy shortcut methods like for example updateUserPassword which internaly uses the more generic method user.update.

## TODO

* Implement orgUnits.
