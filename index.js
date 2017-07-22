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
    fastify.decorateRequest(methodName, function () {
      const acceptsObject = this.accepts()
      return acceptsObject[methodName].apply(acceptsObject, arguments)
    })
  })

  done()
}

module.exports = fp(fastifyAcceptHeader, '>= 0.13.1')
