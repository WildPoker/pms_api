/**
 * The models of the project
 * @module models/project
 */
'use strict'

const mongoose = require('mongoose')
const path = require('path')
const filename = path.basename(__filename, '.js')

const image = {
  data: Buffer,
  contentType: String
}

const schema = new mongoose.Schema(
  {
    img: image,
    name: {
      type: String,
      requird: true
    },
    description: {
      type: String
    },
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'log'
      }
    ],
    gallery: [image],
    progress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'progress'
      }
    ],
    step: {
      type: Number,
      default: 1
    },
    start_date: {
      type: Date
    },
    end_date: {
      type: Date
    },
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'DONE'],
      default: 'TODO'
    },
    deleted: {
      type: Boolean,
      default: false
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
