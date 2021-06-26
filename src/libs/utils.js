'use strict'

module.exports = {
  mode: node_env => {
    return node_env !== undefined ? node_env.trim() : 'development'
  }
}
