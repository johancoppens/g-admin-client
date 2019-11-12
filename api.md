<a name="module_g-admin-client"></a>

## g-admin-client
The Google Admin Client (g-admin-client) is a module with the aim of making it easier to manage users and groups in a G Suite domain with [Node.js](https://nodejs.org/)


* [g-admin-client](#module_g-admin-client)
    * _static_
        * [.removeUserFromGroup](#module_g-admin-client.removeUserFromGroup) ⇒ <code>Promise</code>
        * [.removeGroupFromGroup](#module_g-admin-client.removeGroupFromGroup) ⇒ <code>Promise</code>
        * [.init(options)](#module_g-admin-client.init) ⇒ <code>Promise</code>
        * [.getUser(options)](#module_g-admin-client.getUser) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.createUser(options)](#module_g-admin-client.createUser) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.updateUser(options)](#module_g-admin-client.updateUser) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.deleteUser(options)](#module_g-admin-client.deleteUser) ⇒ <code>Promise</code>
        * [.updateUserPassword(options)](#module_g-admin-client.updateUserPassword) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.setUserStateInactive(options)](#module_g-admin-client.setUserStateInactive) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.setUserStateActive(options)](#module_g-admin-client.setUserStateActive) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.addUserToGroup(options)](#module_g-admin-client.addUserToGroup) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.setUserOU(options)](#module_g-admin-client.setUserOU) ⇒ <code>Promise</code>
        * [.getUsersByOU(options)](#module_g-admin-client.getUsersByOU) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
        * [.getUserPhoto(options)](#module_g-admin-client.getUserPhoto) ⇒ <code>Promise.&lt;bytes&gt;</code>
        * [.setUserPhoto(options)](#module_g-admin-client.setUserPhoto) ⇒ <code>Promise.&lt;bytes&gt;</code>
        * [.getGroup(options)](#module_g-admin-client.getGroup) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.createGroup(options)](#module_g-admin-client.createGroup) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.updateGroup(options)](#module_g-admin-client.updateGroup) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.deleteGroup(options)](#module_g-admin-client.deleteGroup) ⇒ <code>Promise</code>
        * [.addGroupToGroup(options)](#module_g-admin-client.addGroupToGroup) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.getGroupMembers(options)](#module_g-admin-client.getGroupMembers) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
        * [.getGroups()](#module_g-admin-client.getGroups) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
        * [.getGroupSettings(options)](#module_g-admin-client.getGroupSettings) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.updateGroupSettings(options)](#module_g-admin-client.updateGroupSettings) ⇒ <code>Promise.&lt;Object&gt;</code>
    * _inner_
        * [~GAdminClientError](#module_g-admin-client.GAdminClientError)
            * [new GAdminClientError(message)](#new_module_g-admin-client.GAdminClientError_new)
        * [~GAdminServiceError](#module_g-admin-client.GAdminServiceError)
            * [new GAdminServiceError(message)](#new_module_g-admin-client.GAdminServiceError_new)

<a name="module_g-admin-client.removeUserFromGroup"></a>

### g-admin-client.removeUserFromGroup ⇒ <code>Promise</code>
Removes a user from a group

**Kind**: static constant of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise</code> - Members resource  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupKey | <code>string</code> |  |
| options.memberKey | <code>string</code> | User's email address |

<a name="module_g-admin-client.removeGroupFromGroup"></a>

### g-admin-client.removeGroupFromGroup ⇒ <code>Promise</code>
Removes a group from a group

**Kind**: static constant of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise</code> - Members resource  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupKey | <code>string</code> |  |
| options.memberKey | <code>string</code> | Group's email address |

<a name="module_g-admin-client.init"></a>

### g-admin-client.init(options) ⇒ <code>Promise</code>
Initialize g-admin-client API module

Note: See README_DOMAIN_CONFIG.md on how to set up you G Suite domain

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**See**: [./README_DOMAIN_CONFIG.md](./README_DOMAIN_CONFIG.md)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.keyFile | <code>string</code> | 
| options.gSuiteAdminAccount | <code>string</code> | 
| options.domain | <code>string</code> | 

<a name="module_g-admin-client.getUser"></a>

### g-admin-client.getUser(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Retrieves a user

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The user or null when not found  
**See**

- [./examples/00_get_user.js](./examples/00_get_user.js)
- [./examples/01_get_user_transform.js](./examples/01_get_user_transform.js)


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.userKey | <code>string</code> | User's primary email address, alias email address, or unique user ID |

<a name="module_g-admin-client.createUser"></a>

### g-admin-client.createUser(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a user

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The newly created user  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| options.firstName | <code>string</code> |  | 
| options.lastName | <code>string</code> |  | 
| options.password | <code>string</code> |  | 
| options.email | <code>string</code> |  | 
| [options.orgUnitPath] | <code>string</code> | <code>&quot;/&quot;</code> | 
| [options.changePasswordAtNextLogin] | <code>boolean</code> | <code>true</code> | 

<a name="module_g-admin-client.updateUser"></a>

### g-admin-client.updateUser(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Updates a user. This is the generic method to update a user

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - User resource  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.userKey | <code>string</code> | The user's primary email address, alias email address, or unique user ID |
| options.userResource | <code>string</code> | An object representing a user resource |

<a name="module_g-admin-client.deleteUser"></a>

### g-admin-client.deleteUser(options) ⇒ <code>Promise</code>
Deletes a user.

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.userKey | <code>string</code> | The user's primary email address, alias email address, or unique user ID |

<a name="module_g-admin-client.updateUserPassword"></a>

### g-admin-client.updateUserPassword(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Updates a user's password

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - User resource  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| options.userKey | <code>string</code> |  | 
| options.newPassword | <code>string</code> |  | 
| [options.changePasswordAtNextLogin] | <code>string</code> | <code>false</code> | 

<a name="module_g-admin-client.setUserStateInactive"></a>

### g-admin-client.setUserStateInactive(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Suspends a user

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - User resource  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.userKey | <code>string</code> | 

<a name="module_g-admin-client.setUserStateActive"></a>

### g-admin-client.setUserStateActive(options) ⇒ <code>Promise.&lt;Object&gt;</code>
(Re)activates the user

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - User resource  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.userKey | <code>string</code> | 

<a name="module_g-admin-client.addUserToGroup"></a>

### g-admin-client.addUserToGroup(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Adds a user to group

Note: Non domain users not allowed

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Members resource  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupKey | <code>string</code> |  |
| options.email | <code>string</code> | User's email address |

<a name="module_g-admin-client.setUserOU"></a>

### g-admin-client.setUserOU(options) ⇒ <code>Promise</code>
Sets the orgUnitPath for a user

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise</code> - User resource  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.userKey | <code>string</code> | 
| options.orgUnitPath | <code>string</code> | 

<a name="module_g-admin-client.getUsersByOU"></a>

### g-admin-client.getUsersByOU(options) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Gets all users for a given orgUnitPath

Note: We do the paging for you. The advantage is that you'll get one large data set :-) As a consideration, you must ensure that this set does not grow too large. You can do this by organizing your users into smaller orgUnits. In my domain I can get all my users (+ -1200) in just 5sec.

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - An array of user resources  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| [options.orgUnitPath] | <code>string</code> | <code>&quot;/&quot;</code> | 

<a name="module_g-admin-client.getUserPhoto"></a>

### g-admin-client.getUserPhoto(options) ⇒ <code>Promise.&lt;bytes&gt;</code>
Retrieves the user's photo

Note: Whatever the size of the photo being uploaded, the API downsizes it to 96x96 pixels.

Note2: You can write it to disk like this: await writeFile('./out/photo.jpeg', photoData, 'base64')

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;bytes&gt;</code> - The user photo's upload data in web-safe Base64 format in bytes or null when no photo or user not found  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.userKey | <code>string</code> | The user's primary email address, alias email address, or unique user ID |

<a name="module_g-admin-client.setUserPhoto"></a>

### g-admin-client.setUserPhoto(options) ⇒ <code>Promise.&lt;bytes&gt;</code>
Adds a photo for the user.

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;bytes&gt;</code> - The user photo's upload data in web-safe Base64 format in bytes downsized to 96x96 pixels  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.userKey | <code>string</code> | The user's primary email address, alias email address, or unique user ID |
| options.photoData | <code>bytes</code> | The user photo's upload data in web-safe Base64 format in bytes |

**Example**  
```js
// You can load photoData from disk and encode it with base64url npm package like this
const photoData = base64url(await readFile('./assets/jane.roe.jpeg'))
res = await gAdmin.setUserPhoto({
  userKey: 'jane.roe@edugolo.be',
  photoData: photoData
})
```
<a name="module_g-admin-client.getGroup"></a>

### g-admin-client.getGroup(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Retrieves a group's properties.

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Group resource or null when not found  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupKey | <code>string</code> | The group's email address, group alias, or the unique group ID. |

<a name="module_g-admin-client.createGroup"></a>

### g-admin-client.createGroup(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a group

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The newly created group  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.email | <code>string</code> | 
| options.name | <code>string</code> | 
| [options.description] | <code>string</code> | 

<a name="module_g-admin-client.updateGroup"></a>

### g-admin-client.updateGroup(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Updates a group. This is the generic method to update a group

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Group resource  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupKey | <code>string</code> | The group's email address, group alias, or the unique group ID |
| options.groupResource | <code>string</code> | An object representing a group resource |

<a name="module_g-admin-client.deleteGroup"></a>

### g-admin-client.deleteGroup(options) ⇒ <code>Promise</code>
Deletes a group.

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupKey | <code>string</code> | The group's email address, group alias, or the unique group ID. |

<a name="module_g-admin-client.addGroupToGroup"></a>

### g-admin-client.addGroupToGroup(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Adds a group to group

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Members resource  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupKey | <code>string</code> | Parent group |
| options.email | <code>string</code> | Groups's email address |

<a name="module_g-admin-client.getGroupMembers"></a>

### g-admin-client.getGroupMembers(options) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Gets all members (users and groups) for a given group

Note: We do the paging for you.

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - An array of member resources  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.groupKey | <code>string</code> |  | The group's email address, group alias, or the unique group ID |
| [options.includeDerivedMembership] | <code>string</code> | <code>false</code> | If set to true, members of subgroups will be included |

<a name="module_g-admin-client.getGroups"></a>

### g-admin-client.getGroups() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Gets all groups in your domain

Note: We do the paging for you.

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - An array of group resources  
<a name="module_g-admin-client.getGroupSettings"></a>

### g-admin-client.getGroupSettings(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Retrieves a group's settings identified by the group email address

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Group settings resource  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.email | <code>string</code> | The group's email address |

<a name="module_g-admin-client.updateGroupSettings"></a>

### g-admin-client.updateGroupSettings(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Updates an existing group's settings, which is identified by the group email address

**Kind**: static method of [<code>g-admin-client</code>](#module_g-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Group settings resource  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.email | <code>string</code> | The group's email address |
| options.settings | <code>Object</code> |  |

<a name="module_g-admin-client.GAdminClientError"></a>

### g-admin-client~GAdminClientError
GAdminClientError

**Kind**: inner class of [<code>g-admin-client</code>](#module_g-admin-client)  
<a name="new_module_g-admin-client.GAdminClientError_new"></a>

#### new GAdminClientError(message)
Constructor


| Param | Type |
| --- | --- |
| message | <code>string</code> | 

<a name="module_g-admin-client.GAdminServiceError"></a>

### g-admin-client~GAdminServiceError
GAdminServiceError

**Kind**: inner class of [<code>g-admin-client</code>](#module_g-admin-client)  
<a name="new_module_g-admin-client.GAdminServiceError_new"></a>

#### new GAdminServiceError(message)
Constructor


| Param | Type |
| --- | --- |
| message | <code>string</code> | 

