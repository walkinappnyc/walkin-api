'use strict';

module.exports = function(Property) {
  Property.isActive = function (data, cb) {
    let isActive = data.isActive
    let xml_id = data.xml_id

    Property.find({where: {xml_id: xml_id}}, function (err, instance) {
      console.log(`${JSON.stringify(instance)}`)
      console.log(`${isActive}`)
      instance[0].updateAttributes({isActive: isActive}, function (err, property) {
        console.log(`${JSON.stringify(property)}`)
        if (err) {
          return cb(err)
        } else {
          return cb(null, property)
        }
      })
    })
  }

  Property.isFeatured = function (data, cb) {
    let isFeatured = data.isFeatured
    let xml_id = data.xml_id

    Property.find({where: {xml_id: xml_id}}, function (err, instance) {
      console.log(`${JSON.stringify(instance)}`)
      console.log(`${isFeatured}`)
      instance[0].updateAttributes({isFeatured: isFeatured}, function (err, property) {
        console.log(`${JSON.stringify(property)}`)
        if (err) {
          return cb(err)
        } else {
          return cb(null, property)
        }
      })
    })
  }

  Property.remoteMethod(
    'isActive',
    {
      http: { path: '/isActive', verb: 'patch' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'data', type: 'object' }
    }
  )

  Property.remoteMethod(
    'isFeatured',
    {
      http: { path: '/isFeatured', verb: 'patch' },
      accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
      returns: { arg: 'data', type: 'object' }
    }
  )
};
