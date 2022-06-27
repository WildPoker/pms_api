/**
 * The utils function for managing the type of user
 * @module utils/image
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const Image = require('@src/models/' + filename)

/**
 * Manage the utils function for the image
 **/
module.exports = {
  insert_image: args => {
    const image = new Image(args)
    return dbs.insert(image)
  },
  get_image_by_id: id => {
    return dbs.get_image_by_id({ _id: id })
  },
  get_all_images: async ({ limit = 10, skip = 0, sort, order, joint }) => {
    return await dbs.get_all_images({ limit, skip, sort, order, joint })
  },
  delete_image_by_id: id => {
    return dbs.delete_image_by_id({ _id: id })
  },
  update_image_by_id: (id, update) => {
    return dbs.update_image_by_id(id, update)
  },
  get_all_image: () => {
    return dbs.get_all_image({ _id: id })
  }
}
