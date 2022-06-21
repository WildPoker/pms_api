/**
 * The utils function for managing the type of user
 * @module utils/project
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const Project = require('@src/models/' + filename)

/**
 * Manage the utils function for the project
 **/
module.exports = {
  insert_project: args => {
    const project = new Project(args)
    return dbs.insert(project)
  },
  get_project_by_id: id => {
    return dbs.get_project_by_id({ _id: id })
  },
  delete_project_by_id: id => {
    return dbs.delete_project_by_id({ _id: id })
  },
  update_project_by_id: (id, update) => {
    return dbs.update_project_by_id(id, update)
  },
  get_all_project: () => {
    return dbs.get_all_project({ _id: id })
  }
}
