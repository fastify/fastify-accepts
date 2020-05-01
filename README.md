# fastify-accepts

![CI workflow](https://github.com/fastify/fastify-accepts/workflows/CI%20workflow/badge.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
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
