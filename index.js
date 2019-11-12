/**
 * The Google Admin Client (g-admin-client) is a module with the aim of making it easier to manage users and groups in a G Suite domain with [Node.js](https://nodejs.org/)
 * @module g-admin-client
 */

const { google } = require('googleapis')

// Admin SDK API
const _admin = google.admin({
  version: 'directory_v1'
})
// Groups Settings API
const _groupsSettings = google.groupssettings({
  version: 'v1'
})

module.exports = (function () {
  'use strict'

  let _initialized = false

  const _config = {
    keyFile: null,
    gSuiteAdminAccount: null,
    domain: null
  }
  /**
   * Initialize g-admin-client API module
   *
   * Note: See README_DOMAIN_CONFIG.md on how to set up you G Suite domain
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.keyFile
   * @param {string} options.gSuiteAdminAccount
   * @param {string} options.domain
   * @returns {Promise}
   * @see {@link ./README_DOMAIN_CONFIG.md}
   */
  const init = async ({
    keyFile = r(),
    gSuiteAdminAccount = r(),
    domain = r()
  } = {}) => {
    _config.keyFile = keyFile
    _config.gSuiteAdminAccount = gSuiteAdminAccount
    _config.domain = domain
    const authClient = await _getAuthClient()
    try {
      google.options({
        auth: authClient
      })
      _initialized = true
    } catch (err) {
      throw new GAdminClientError(err.message)
    }
    return true
  }

  const _getAuthClient = async () => {
    const auth = new google.auth.GoogleAuth({
      keyFile: _config.keyFile,
      scopes: [
        'https://www.googleapis.com/auth/admin.directory.user',
        'https://www.googleapis.com/auth/admin.directory.user.readonly',
        'https://www.googleapis.com/auth/admin.directory.group',
        'https://www.googleapis.com/auth/admin.directory.group.readonly',
        'https://www.googleapis.com/auth/admin.directory.group.member',
        'https://www.googleapis.com/auth/apps.groups.settings',
        'https://www.googleapis.com/auth/admin.directory.orgunit',
        'https://www.googleapis.com/auth/admin.directory.orgunit.readonly'
      ]
      // scopes: [
      //   'https://www.googleapis.com/auth/admin.directory.user',
      //   'https://www.googleapis.com/auth/admin.directory.group',
      //   'https://www.googleapis.com/auth/apps.groups.settings'
      // ]
    })
    const authClient = await auth.getClient()
    // Belangrijk! Staat niet in docs. ..
    // Dit is een account die rechten heeft om het domein te beheren
    authClient.subject = _config.gSuiteAdminAccount
    return authClient
  }

  // PRIVATE API CALLS

  // Used by public methods addUserToGroup and addGroupToGroup
  const _groupAddMember = async ({
    groupKey = r(),
    email = r()
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      groupKey: groupKey,
      resource: {
        email: email
      }
    }
    try {
      const res = await _admin.members.insert(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  // Used by public methods removeUserFromGroup and removeGroupFromGroup
  const _groupRemoveMember = async ({
    groupKey = r(),
    memberKey = r()
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      groupKey: groupKey,
      memberKey: memberKey
    }
    try {
      const res = await _admin.members.delete(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  // PUBLIC API

  /**
   * Retrieves a user
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.userKey User's primary email address, alias email address, or unique user ID
   * @returns {Promise<Object>} The user or null when not found
   * @see {@link ./examples/00_get_user.js}
   * @see {@link ./examples/01_get_user_transform.js}
   */
  const getUser = async ({
    userKey
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    try {
      const res = await _admin.users.get({ userKey: userKey })
      return res.data
    } catch (err) {
      if (err.response.status === 404) return null // not a real error, so return null
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Creates a user
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.firstName
   * @param {string} options.lastName
   * @param {string} options.password
   * @param {string} options.email
   * @param {string} [options.orgUnitPath = /]
   * @param {boolean} [options.changePasswordAtNextLogin = true]
   * @returns {Promise<Object>} The newly created user
   */
  const createUser = async ({
    firstName = r(),
    lastName = r(),
    password = r(),
    email = r(),
    orgUnitPath = '/',
    changePasswordAtNextLogin = true
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      resource: {
        name: {
          familyName: lastName,
          givenName: firstName
        },
        password: password,
        primaryEmail: email,
        orgUnitPath: orgUnitPath,
        changePasswordAtNextLogin: changePasswordAtNextLogin
      }
    }
    try {
      const res = await _admin.users.insert(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Updates a user. This is the generic method to update a user
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.userKey The user's primary email address, alias email address, or unique user ID
   * @param {string} options.userResource An object representing a user resource
   * @returns {Promise<Object>} User resource
   */
  const updateUser = async ({
    userKey = r(),
    userResource = r()
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      userKey: userKey,
      resource: userResource
    }
    try {
      const res = await _admin.users.update(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Deletes a user.
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.userKey The user's primary email address, alias email address, or unique user ID
   * @returns {Promise}
   */
  const deleteUser = async ({
    userKey = r()
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      userKey: userKey
    }
    try {
      const res = await _admin.users.delete(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Updates a user's password
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.userKey
   * @param {string} options.newPassword
   * @param {string} [options.changePasswordAtNextLogin = false]
   * @returns {Promise<Object>} User resource
   */
  const updateUserPassword = async ({
    userKey = r(),
    newPassword = r(),
    changePasswordAtNextLogin = false
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      userKey: userKey,
      resource: {
        password: newPassword,
        changePasswordAtNextLogin: changePasswordAtNextLogin
      }
    }
    try {
      const res = await _admin.users.update(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Suspends a user
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.userKey
   * @returns {Promise<Object>} User resource
   */
  const setUserStateInactive = async ({
    userKey = r()
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      userKey: userKey,
      resource: {
        suspended: true
      }
    }
    try {
      const res = await _admin.users.update(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * (Re)activates the user
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.userKey
   * @returns {Promise<Object>} User resource
   */
  const setUserStateActive = async ({
    userKey = r()
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      userKey: userKey,
      resource: {
        suspended: false
      }
    }
    try {
      const res = await _admin.users.update(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Adds a user to group
   *
   * Note: Non domain users not allowed
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.groupKey
   * @param {string} options.email User's email address
   * @returns {Promise<Object>} Members resource
   */
  const addUserToGroup = async ({
    groupKey = r(),
    email = r()
  } = {}) => {
    // Non domain users not allowed
    if (await getUser({ userKey: email })) {
      return _groupAddMember({
        groupKey: groupKey,
        email: email
      })
    } else {
      throw new GAdminClientError('Non domain users not allowed')
    }
  }

  /**
   * Removes a user from a group
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.groupKey
   * @param {string} options.memberKey User's email address
   * @returns {Promise} Members resource
   */
  // Alias for _groupRemoveMember
  const removeUserFromGroup = _groupRemoveMember

  /**
   * Sets the orgUnitPath for a user
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.userKey
   * @param {string} options.orgUnitPath
   * @returns {Promise} User resource
   */
  const setUserOU = async ({
    userKey,
    orgUnitPath
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      userKey: userKey,
      resource: {
        orgUnitPath: orgUnitPath
      }
    }
    try {
      const res = await _admin.users.update(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Gets all users for a given orgUnitPath
   *
   * Note: We do the paging for you. The advantage is that you'll get one large data set :-) As a consideration, you must ensure that this set does not grow too large. You can do this by organizing your users into smaller orgUnits. In my domain I can get all my users (+ -1200) in just 5sec.
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} [options.orgUnitPath = /]
   * @returns {Promise<Array<Object>>} An array of user resources
   */
  const getUsersByOU = async ({
    orgUnitPath = '/'
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      domain: _config.domain,
      query: `orgUnitPath='${orgUnitPath}'`,
      maxResults: 500 // 500 is max allowed for Users.list
    }
    let res = []
    const requestPages = async (options) => {
      try {
        const pageRes = await _admin.users.list(options)
        res = [...res, ...pageRes.data.users]
        if (pageRes.data.nextPageToken) {
          options.pageToken = pageRes.data.nextPageToken
          await requestPages(options)
        }
      } catch (err) {
        throw new GAdminServiceError(err.response.statusText, err.response.status)
      }
    }
    await requestPages(options)
    return res
  }

  /**
   * Retrieves the user's photo
   *
   * Note: Whatever the size of the photo being uploaded, the API downsizes it to 96x96 pixels.
   *
   * Note2: You can write it to disk like this: await writeFile('./out/photo.jpeg', photoData, 'base64')
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.userKey The user's primary email address, alias email address, or unique user ID
   * @returns {Promise<bytes>} The user photo's upload data in web-safe Base64 format in bytes or null when no photo or user not found
   */
  const getUserPhoto = async ({
    userKey = r()
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      userKey: userKey
    }
    try {
      const res = await _admin.users.photos.get(options)
      return res.data.photoData
    } catch (err) {
      if (err.response.status === 404) return null // no photo or user not found, return null
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Adds a photo for the user.
   *
   * @example
   * // You can load photoData from disk and encode it with base64url npm package like this
   * const photoData = base64url(await readFile('./assets/jane.roe.jpeg'))
   * res = await gAdmin.setUserPhoto({
   *   userKey: 'jane.roe@edugolo.be',
   *   photoData: photoData
   * })
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.userKey The user's primary email address, alias email address, or unique user ID
   * @param {bytes} options.photoData The user photo's upload data in web-safe Base64 format in bytes
   * @returns {Promise<bytes>} The user photo's upload data in web-safe Base64 format in bytes downsized to 96x96 pixels
   */
  const setUserPhoto = async ({
    userKey = r(),
    photoData = r()
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')

    const options = {
      userKey: userKey,
      resource: {
        photoData: photoData
        // mimeType: 'jpeg'
      }
    }
    try {
      const res = await _admin.users.photos.update(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Retrieves a group's properties.
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.groupKey The group's email address, group alias, or the unique group ID.
   * @returns {Promise<Object>} Group resource or null when not found
   */
  const getGroup = async ({
    groupKey
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    try {
      const res = await _admin.groups.get({ groupKey: groupKey })
      return res.data
    } catch (err) {
      if (err.response.status === 404) return null // not a real error
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Creates a group
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.email
   * @param {string} options.name
   * @param {string} [options.description]
   * @returns {Promise<Object>} The newly created group
   */
  const createGroup = async ({
    email = r(),
    name = r(),
    description
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      resource: {
        email: email,
        name: name,
        description: description
      }
    }
    try {
      const res = await _admin.groups.insert(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Updates a group. This is the generic method to update a group
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.groupKey The group's email address, group alias, or the unique group ID
   * @param {string} options.groupResource An object representing a group resource
   * @returns {Promise<Object>} Group resource
   */
  const updateGroup = async ({
    groupKey = r(),
    groupResource = r()
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      groupKey: groupKey,
      resource: groupResource
    }
    try {
      const res = await _admin.groups.update(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Deletes a group.
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.groupKey The group's email address, group alias, or the unique group ID.
   * @returns {Promise}
   */
  const deleteGroup = async ({
    groupKey = r()
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      groupKey: groupKey
    }
    try {
      const res = await _admin.groups.delete(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Adds a group to group
   *
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.groupKey Parent group
   * @param {string} options.email Groups's email address
   * @returns {Promise<Object>} Members resource
   */
  const addGroupToGroup = async ({
    groupKey = r(),
    email = r()
  } = {}) => {
    // Check group exists
    if (await getGroup({ groupKey: email })) {
      return _groupAddMember({
        groupKey: groupKey,
        email: email
      })
    } else {
      throw new GAdminClientError('Group does not exist')
    }
  }

  /**
   * Removes a group from a group
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.groupKey
   * @param {string} options.memberKey Group's email address
   * @returns {Promise} Members resource
   */
  // Alias for _groupRemoveMember
  const removeGroupFromGroup = _groupRemoveMember

  /**
   * Gets all members (users and groups) for a given group
   *
   * Note: We do the paging for you.
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.groupKey The group's email address, group alias, or the unique group ID
   * @param {string} [options.includeDerivedMembership = false] If set to true, members of subgroups will be included
   * @returns {Promise<Array<Object>>} An array of member resources
   */
  const getGroupMembers = async ({
    groupKey = r(),
    includeDerivedMembership = false
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      groupKey: groupKey,
      includeDerivedMembership: includeDerivedMembership,
      maxResults: 200 // Max 200(default)
    }
    let res = []
    const requestPages = async (options) => {
      try {
        const pageRes = await _admin.members.list(options)
        res = [...res, ...pageRes.data.members]
        if (pageRes.data.nextPageToken) {
          options.pageToken = pageRes.data.nextPageToken
          await requestPages(options)
        }
      } catch (err) {
        throw new GAdminServiceError(err.response.statusText, err.response.status)
      }
    }
    await requestPages(options)
    return res
  }

  /**
   * Gets all groups in your domain
   *
   * Note: We do the paging for you.
   * @memberof module:g-admin-client
   * @returns {Promise<Array<Object>>} An array of group resources
   */
  const getGroups = async () => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      domain: _config.domain,
      maxResults: 200 // Max 200(default)
    }
    let res = []
    const requestPages = async (options) => {
      try {
        const pageRes = await _admin.groups.list(options)
        res = [...res, ...pageRes.data.groups]
        if (pageRes.data.nextPageToken) {
          options.pageToken = pageRes.data.nextPageToken
          await requestPages(options)
        }
      } catch (err) {
        throw new GAdminServiceError(err.response.statusText, err.response.status)
      }
    }
    await requestPages(options)
    return res
  }

  /**
   * Retrieves a group's settings identified by the group email address
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.email The group's email address
   * @returns {Promise<Object>} Group settings resource
   */
  const getGroupSettings = async ({
    email = r()
  }) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      groupUniqueId: email,
      alt: 'json' // default xml
    }
    try {
      const res = await _groupsSettings.groups.get(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  /**
   * Updates an existing group's settings, which is identified by the group email address
   * @memberof module:g-admin-client
   * @param {object} options
   * @param {string} options.email The group's email address
   * @param {Object} options.settings
   * @returns {Promise<Object>} Group settings resource
   */
  const updateGroupSettings = async ({
    email = r(),
    settings = r()
  }) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const options = {
      groupUniqueId: email,
      requestBody: settings
    }
    try {
      const res = await _groupsSettings.groups.update(options)
      return res.data
    } catch (err) {
      throw new GAdminServiceError(err.response.statusText, err.response.status)
    }
  }

  // /**
  //  * Retrieves an organizational unit.
  //  *
  //  * No trailing slash?
  //  * @memberof module:g-admin-client
  //  * @param {object} options
  //  * @param {string} options.orgUnitPath The full path of the organizational unit or its unique ID.
  //  * @returns {Promise<Object>} orgUnit resource
  //  * @returns {Promise<Array<Object>>} orgUnit resource
  //  */
  // const getOU = async ({
  //   orgUnitPath = r()
  // }) => {
  //   if (!_initialized) e('Module g-admin-client not initialized with init()')
  //   const options = {
  //     customerId: 'my_customer',
  //     orgUnitPath: orgUnitPath
  //   }
  //   try {
  //     const res = await _admin.orgunits.get(options)
  //     return res.data
  //   } catch (err) {
  //     throw new GAdminServiceError(err.response.statusText, err.response.status)
  //   }
  // }

  /**
   * GAdminClientError
   * @class
   * @memberof module:g-admin-client
   */
  class GAdminClientError extends Error {
    /**
     * Constructor
     * @param {string} message
     */
    constructor (message) {
      super(message)
      this.name = 'GAdminClientError'
    }
  }

  /**
   * GAdminServiceError
   * @class
   * @memberof module:g-admin-client
   */
  class GAdminServiceError extends Error {
    /**
     * Constructor
     * @param {string} message
     */
    constructor (message, statusCode) {
      super(message)
      this.name = 'GAdminServiceError'
      this.statusCode = statusCode
    }
  }

  // Utility shortcut functions
  // Parameter error func used if parameter is required
  const r = () => {
    e('Vereiste parameter is niet opgegeven')
  }
  // Shortcut for throwing a g-admin-client error
  const e = (message) => {
    throw new GAdminClientError(message)
  }
  // Shortcut for console.log
  // const l = (v) => {
  //   console.log(util.inspect(v, { color: true, depth: null }))
  // }

  // Expose public API
  return {
    init,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateUserPassword,
    setUserStateInactive,
    setUserStateActive,
    addUserToGroup,
    removeUserFromGroup,
    setUserOU,
    getUsersByOU,
    getUserPhoto,
    setUserPhoto,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup,
    addGroupToGroup,
    removeGroupFromGroup,
    getGroupMembers,
    getGroups,
    getGroupSettings,
    updateGroupSettings,
    // getOU,
    // createOU,
    // updateOU,
    // deleteOU,
    GAdminClientError
  }
}())
