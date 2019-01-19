'use strict'

module.exports = {
  'mysql': {
    'host': process.env.PRODUCTION_RDS_HOST,
    'port': 3306,
    'database': process.env.PRODUCTION_RDS_DB,
    'user': process.env.PRODUCTION_RDS_USER,
    'password': process.env.PRODUCTION_RDS_PWD,
    'name': 'mysql',
    'connector': 'mysql',
  },
}