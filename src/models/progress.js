/**
 * The models of the progress
 * @module models/progress
 */
'use strict'

const mongoose = require('mongoose')
const path = require('path')
const filename = path.basename(__filename, '.js')

const schema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'DONE'],
      default: 'TODO'
    },
    step: {
      type: Number
    },
    start_date: {
      type: Date
    },
    end_date: {
      type: Date
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    collection: filename,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

module.exports = mongoose.model(filename, schema)
