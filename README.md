# fastify-accepts

[![Greenkeeper badge](https://badges.greenkeeper.io/fastify/fastify-accepts.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/fastify/fastify-accepts.svg?branch=master)](https://travis-ci.org/fastify/fastify-accepts)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Coverage Status](https://coveralls.io/repos/github/fastify/fastify-accepts/badge.svg?branch=feature%2Fshortcuts)](https://coveralls.io/github/fastify/fastify-accepts?branch=feature%2Fshortcuts)
[![Known Vulnerabilities](https://snyk.io/test/github/fastify/fastify-accepts/badge.svg)](https://snyk.io/test/github/fastify/fastify-accepts)

Add accepts parser to fastify

## Install

`npm install --save fastify-accepts`

## Usage

```js
const fastify = require('fastify')
const Boom = require('boom')

fastify.register(require('fastify-accepts'))

fastify.post('/', function (req, reply) {
  const accept = req.accepts() // Accepts object
  switch(accept.type(['json', 'html'])) {
    case 'json':
      reply.type('application/json').send({hello: 'world'})
      break
    case 'html':
      reply.type('text/html').send('<b>hello, world!</b>')
      break
    default:
      reply.send(Boom.notAcceptable('unacceptable'))
      break
  }
})
```

See [accepts package](https://www.npmjs.com/package/accepts) for all available APIs.

This plugin adds to `Request` object all `Accepts` object methods.

```js
fastify.post('/', function (req, reply) {
  req.charset(['utf-8'])
  req.charsets()
  req.encoding(['gzip', 'compress'])
  req.encodings()
  req.language(['es', 'en'])
  req.languages()
  req.type(['image/png', 'image/tiff'])
  req.types()
})
```

## License

Licensed under [MIT](./LICENSE)
