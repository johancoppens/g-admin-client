// One big example file
// Comment / uncomment where needed
// Edit and rename config.template.js to fit your needs
const gAdmin = require('./index')
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const base64url = require('base64url')
const conf = require('./config')
const main = async () => {
  try {
    // Initialize
    await gAdmin.init(conf)

    let res = null

    res = await gAdmin.createUser({
      firstName: 'Jane',
      surName: 'Roe',
      password: 'Pa55word',
      email: 'jane.roe@example.com'
    })
    console.log(res)

    // res = await gAdmin.updateUser({
    //   userKey: 'jane.roe@example.com',
    //   userResource: {
    //     name: {
    //       givenName: 'Mary Jane'
    //     }
    //   }
    // })
    // console.log(res)

    // res = await gAdmin.deleteUser({
    //   userKey: 'james.doe@example.com'
    // })
    // console.log(res)

    // res = await gAdmin.getUser({ userKey: 'jane.roe@example.com' })
    // console.log(res)

    // res = await gAdmin.updateUserPassword({
    //   userKey: 'jane.roe@example.com',
    //   newPassword: 'Pa55word2',
    //   changePasswordAtNextLogin: true
    // })
    // console.log(res)

    // res = await gAdmin.setUserStateInactive({ userKey: 'jane.roe@example.com' })
    // console.log(res)

    // res = await gAdmin.setUserStateActive({ userKey: 'jane.roe@example.com' })
    // console.log(res)

    // res = await gAdmin.addUserToGroup({
    //   groupKey: 'demo@example.com',
    //   email: 'jane.roe@example.com'
    // })
    // console.log(res)

    // res = await gAdmin.removeUserFromGroup({
    //   groupKey: 'demo@example.com',
    //   memberKey: 'jane.roe@example.com'
    // })
    // console.log(res)

    // res = await gAdmin.setUserOU({
    //   userKey: 'jane.roe@example.com',
    //   orgUnitPath: '/demo'
    // })
    // console.log(res)

    // res = await gAdmin.getUsersByOU({
    //   orgUnitPath: '/demo'
    // })
    // console.log(res)

    // res = await gAdmin.getUsersByOU()
    // console.log(res.length)

    // res = await gAdmin.getGroup({ groupKey: 'demo@example.com' })
    // console.log(res)

    // res = await gAdmin.createGroup({
    //   email: 'demosub@example.com',
    //   name: 'Demo sub group',
    //   description: 'Demo sub group\'s description'
    // })
    // console.log(res)

    // res = await gAdmin.updateGroup({
    //   groupKey: 'demogroup1@example.com',
    //   groupResource: {
    //     name: 'New name demo1'
    //   }
    // })
    // console.log(res)

    // res = await gAdmin.deleteGroup({
    //   groupKey: 'demogroup1a@example.com'
    // })
    // console.log(res)

    // res = await gAdmin.addGroupToGroup({
    //   groupKey: 'demo@example.com',
    //   email: 'demosub@example.com'
    // })
    // console.log(res)

    // res = await gAdmin.removeGroupFromGroup({
    //   groupKey: 'demo@example.com',
    //   memberKey: 'demo2@example.com'
    // })
    // console.log(res)

    // res = await gAdmin.getGroupMembers({
    //   groupKey: 'demo@example.com'
    // })
    // console.log(res)

    // res = await gAdmin.getGroupMembers({
    //   groupKey: 'demo@example.com',
    //   includeDerivedMembership: true
    // })
    // console.log(res)

    // res = await gAdmin.getGroups()
    // console.log(res.length)

    // res = await gAdmin.getGroupSettings({
    //   groupKey: 'demo@example.com'
    // })
    // console.log(res)

    // res = await gAdmin.updateGroupSettings({
    //   email: 'demo@example.com',
    //   settings: {
    //     whoCanContactOwner: 'ANYONE_CAN_CONTACT',
    //     whoCanViewMembership: 'ALL_IN_DOMAIN_CAN_VIEW',
    //     whoCanViewGroup: 'ALL_MEMBERS_CAN_VIEW',
    //     whoCanPostMessage: 'ALL_IN_DOMAIN_CAN_POST',
    //     // whoCanPostMessage: 'ANYONE_CAN_POST',
    //     whoCanInvite: 'ALL_MANAGERS_CAN_INVITE',
    //     whoCanAdd: 'ALL_MANAGERS_CAN_ADD',
    //     whoCanApproveMembers: 'ALL_MANAGERS_CAN_APPROVE',
    //     whoCanBanUsers: 'OWNERS_AND_MANAGERS',
    //     whoCanModifyMembers: 'OWNERS_AND_MANAGERS',
    //     whoCanModerateMembers: 'OWNERS_AND_MANAGERS',
    //     whoCanJoin: 'CAN_REQUEST_TO_JOIN',
    //     allowExternalMembers: 'false',
    //     showInGroupDirectory: 'false',
    //     whoCanDiscoverGroup: 'ALL_MEMBERS_CAN_DISCOVER'
    //   }
    // })
    // console.log(res)

    // res = await gAdmin.getUserPhoto({
    //   userKey: 'jane.roe@example.com'
    // })
    // if (res) {
    //   await writeFile('./out/photo.jpeg', res, 'base64')
    // } else {
    //   console.log(res)
    // }

    // const photoData = base64url(await readFile('./assets/jane.roe.jpeg'))

    // res = await gAdmin.setUserPhoto({
    //   userKey: 'jane.roe@example.com',
    //   photoData: photoData
    // })
    // console.log(res)
  } catch (e) {
    console.log(e)
  }
}
main().catch(console.error)
