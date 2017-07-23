'use strict'

const accepts = require('accepts')

const fp = require('fastify-plugin')

const acceptsObjectSymbol = Symbol('acceptsObject')

const methodNames = [
  'charset', 'charsets',
  'encoding', 'encodings',
  'language', 'languages',
  'type', 'types'
]

function acceptsMethod () {
  if (!this.req[acceptsObjectSymbol]) {
    this.req[acceptsObjectSymbol] = accepts(this.req)
  }

  return this.req[acceptsObjectSymbol]
}

function fastifyAcceptHeader (fastify, options, done) {
  fastify.decorateRequest('accepts', acceptsMethod)

  methodNames.forEach(methodName => {
    fastify.decorateRequest(methodName, function (a, b, c, d) {
      const acceptsObject = this.accepts()
      if (arguments.length === 0) return acceptsObject[methodName]()
      if (arguments.length === 1) return acceptsObject[methodName](a)
      if (arguments.length === 2) return acceptsObject[methodName](a, b)
      if (arguments.length === 3) return acceptsObject[methodName](a, b, c)
      if (arguments.length === 4) return acceptsObject[methodName](a, b, c, d)

      return acceptsObject[methodName].apply(acceptsObject, arguments)
    })
  })

  done()
}

module.exports = fp(fastifyAcceptHeader, '>= 0.13.1')
