/**
 * Set of global functions or constants about the dbs and mongoose
 * @module libs/dbs
 */
'use strict'

const constants = require('../libs/constants')

module.exports = {
  /**
   * Get the date of yesterday
   **/
  handle_classic_filters: ({ matches, order, sort, limit, joint }) => {
    const aggregation = []

    if (matches.length === 1) {
      aggregation.push({ $match: matches[0] })
    } else if (matches.length > 1) {
      // Joint has been filtered in the filter util already
      aggregation.push({ $match: { ['$' + joint]: matches } })
    }

    // Sort the result
    order = order === constants.order_descending ? 1 : -1
    sort = sort !== null ? { [sort]: order } : { _id: order }
    aggregation.push({ $sort: sort })

    // Limit the result
    if (limit !== null) {
      aggregation.push({ $limit: limit })
    }

    return aggregation
  },
  /**
   * Handle the Classic Filter version 2. adds defaults and record count.
   **/
  handle_classic_filters_with_count: ({ matches, order, sort, limit, skip, joint, count, unset }) => {
    matches = matches || []
    joint = joint || 'and'
    skip = skip || 0
    limit = limit || 10
    unset = unset || []
    const aggregation = []
    order = order || 'desc'

    if (matches.length === 1) {
      aggregation.push({ $match: matches[0] })
    } else if (matches.length > 1) {
      // Joint has been filtered in the filter util already
      aggregation.push({ $match: { ['$' + joint]: matches } })
    }

    // Sort the result
    order = order == 'desc' ? -1 : 1
    sort = sort !== null ? { [sort]: order } : { _id: order }
    aggregation.push({ $sort: sort })

    const result = [
      {
        $match: {}
      }
    ]

    if (skip !== null) {
      result.push({ $skip: skip })
    }

    if (limit !== null) {
      aggregation.push({ $limit: limit })
    }

    if (unset.length) {
      aggregation.push({ $unset: unset })
    }
    if (count !== null && count) {
      aggregation.push({
        $facet: {
          pageInfo: [
            {
              $count: 'totalRecords'
            }
          ],
          result
        }
      })
    }

    return aggregation
  }
}
