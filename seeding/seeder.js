'use strict'

require('module-alias/register')
const utils = require('@src/libs/utils')
const mode = utils.mode(process.env.NODE_ENV)
require('dotenv').config({ path: './env/.env.' + mode })
const path = require('path')
const { Seeder } = require('mongo-seeding')

const get_seeder = (config) => {
  return new Seeder(config)
}
/**
* Seed the database with the informations in data
**/
const seed = async (folder = 'datas') => {
  const seeder = get_seeder({
    database: 'mongodb+srv://Admin-Denzel:PMS-PASSWORD@pms-api.ogccl.mongodb.net/pms_api',
    dropDatabase: true
  })

  const collectionReadingOptions = {
    transformers: [
      Seeder.Transformers.replaceDocumentIdWithUnderscoreId
    ]
  }

  const collections = seeder.readCollectionsFromPath(
    path.resolve('./seeding/' + folder),
    collectionReadingOptions
  )
    
  await seeder.import(collections)
}

seed()
