'use strict'

const models = [
  'Client',
  'Incentive',
  'Job',
  'SiteVar',
  'FrequentlyAskedQuestion',
  'Building',
  'OpenHouse',
  'Feature',
  'Unit'
]

module.exports = function migrateAccountModels (app, next) {
  const psql = app.dataSources.testwalk
  psql.isActual(models, (err, actual) => {
    if (err) {
      throw err
    }

    let syncStatus = actual ? 'in sync' : 'out of sync'

    console.log('')
    console.log(`Custom models are ${syncStatus}`)
    console.log('')

    if (actual) return next()

    console.log('Migrating Custom Models...')

    psql.autoupdate(models, (err, result) => {
      if (err) throw err

      console.log('Custom models migration successful!')
      console.log('')

      next()
    })
  })
}