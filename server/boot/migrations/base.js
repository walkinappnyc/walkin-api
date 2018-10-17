'use strict'

const path = require('path')
const models = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']

module.exports = function migrateBaseModels (app, next) {
  const psql = app.dataSources.testwalk
  psql.isActual(models, (err, actual) => {
    if (err) {
      throw err
    }

    let syncStatus = actual ? 'in sync' : 'out of sync'
    console.log('')
    console.log(`Base models are ${syncStatus}`)
    if (actual) return next()

    console.log('Migrating Base Models...')

    psql.autoupdate(models, (err, result) => {
      if (err) throw err
      console.log('Base models migration successful!')
      next()
    })
  })
}