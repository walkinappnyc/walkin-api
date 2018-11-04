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
  'Unit',
  'Region',
  'TenantLead',
  'Address',
  'FailedJob',
  'OpenHouse',
  'Timeline',
  'Neighborhood',
  'Transportation',
  'MetaData',
  'Floorplan',
  'Attraction',
  'Slideshow',
  'Amenity',
  'SiteVar',
  'Feature',
  'FrequentlyAskedQuestion',
  'PointofInterestCategories',
  'PointofInterest',
  'Incentive',
  'Image',
  'FeatureUnit',
  'IncentiveUnit',
  'BuildingClient',
  'AttractionRegion',
  'NeighborhoodPointOfInterest',
  'AmenityBuilding',
  'RegionWaitunit'
]

module.exports = function migrateAccountModels (app, next) {
  const mysql = app.dataSources.mysql
  mysql.isActual(models, (err, actual) => {
    if (err) {
      throw err
    }

    let syncStatus = actual ? 'in sync' : 'out of sync'

    console.log('')
    console.log(`Custom models are ${syncStatus}`)
    console.log('')

    if (actual) return next()

    console.log('Migrating Custom Models...')

    mysql.autoupdate(models, (err, result) => {
      if (err) throw err

      console.log('Custom models migration successful!')
      console.log('')

      next()
    })
  })
}