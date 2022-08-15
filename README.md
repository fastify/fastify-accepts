# @fastify/accepts

![CI](https://github.com/fastify/fastify-accepts/workflows/CI/badge.svg)
[![NPM version](https://img.shields.io/npm/v/@fastify/accepts.svg?style=flat)](https://www.npmjs.com/package/@fastify/accepts)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

Add accepts parser to fastify

## Install

`npm i @fastify/accepts`

## Usage

```js
const fastify = require('fastify')
const Boom = require('@hapi/boom')

fastify.register(require('@fastify/accepts'))

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
