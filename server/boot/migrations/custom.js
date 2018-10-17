'use strict'

const models = [
  'Client'
]

module.exports = function migrateAccountModels (app, next) {
  if (process.env.NODE_ENV = 'staging') {
    console.log('staging')
    const psql = app.dataSources.staging
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
  } else if (process.env.NODE_ENV = 'prod') {
    console.log('prod')
    const psql = app.dataSources.prod
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
  } else {
    console.log('dev')
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
}