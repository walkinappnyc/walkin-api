'use strict';

let app = require('../server')

module.exports = function(Landlord) {
  Landlord.isActive = function (data, cb) {
    let isActive = data.isActive
    let company = data.company

    Landlord.find({where: {company: company}}, function(err, instance) {
      console.log(`${JSON.stringify(instance)}`)
      console.log(`${isActive}`)
      instance[0].updateAttributes({isActive: isActive}, function(err, landlord) {
        console.log(`${JSON.stringify(landlord)}`)
        console.log(`${JSON.stringify(instance)}`)
        if (err) {
          return cb(err)
        } else {
          app.models.Property.find({where: {landlordId: landlord.id}}, function (err, properties) {
            console.log(`${JSON.stringify(properties)}`)

            if (err) {
              return cb(err)
            } else {
              properties.forEach(item => {
                item.updateAttributes({ isActive: isActive }, function (err, instance) {
                  console.log(`${instance}`)
                })
              })
            }
          })
          return cb(null, landlord)
        }
      })
    })
  }

  Landlord.remoteMethod(
    'isActive',
    {
      http: {path: '/isActive', verb: 'patch'},
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'data', type: 'object' }
    }
  )
};
