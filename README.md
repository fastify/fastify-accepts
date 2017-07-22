# fastify-accepts

[![Build Status](https://travis-ci.org/fastify/fastify-accepts.svg?branch=master)](https://travis-ci.org/fastify/fastify-accepts)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

## License

Licensed under [MIT](./LICENSE)
