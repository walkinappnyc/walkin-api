'use strict'
const join = require('path').join
module.exports = function sslMiddleware () {
  return function sslRedirection (req, res, next) {
    const env = process.env.NODE_ENV
    // Only do if on production
    if (env === 'production') {
      // a special header ALBs include to say if it was HTTPS.  If it's already HTTPS, continue on.
      if (req.headers['x-forwarded-proto'] === 'https') return next()
      // otherwise, redirect them to their exact same route except with HTTPS
      return res.redirect(301, `https://${join(req.hostname, req.url)}`)
    }
    // If we're in development ignore this all together
    return next()
  }
}