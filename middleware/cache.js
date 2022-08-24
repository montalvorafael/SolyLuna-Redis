const getExpeditiousCache = require('express-expeditious');

const defaultOptions={
    namespace: 'expresscache',
    defaultTtl: '15 minute',
    engine: require('expeditious-engine-redis')({
    // options for the redis driver
    host: '127.0.0.1',
    port: 6379
  })
}

const cacheInit = getExpeditiousCache(defaultOptions)

module.exports = {cacheInit}