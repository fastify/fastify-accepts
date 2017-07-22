'use strict'

const accepts = require('accepts')

const fp = require('fastify-plugin')

const acceptsObjectSymbol = Symbol('acceptsObject')

function acceptsMethod () {
  if (!this.req[acceptsObjectSymbol]) {
    this.req[acceptsObjectSymbol] = accepts(this.req)
  }

  return this.req[acceptsObjectSymbol]
}

function fastifyAcceptHeader (fastify, options, done) {
  fastify.decorateRequest('accepts', acceptsMethod)

  done()
}

module.exports = fp(fastifyAcceptHeader, '>= 0.13.1')
