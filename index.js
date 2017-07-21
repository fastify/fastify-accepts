'use strict'

const accepts = require('accepts')

const fp = require('fastify-plugin')

function acceptsMethod () {
  return accepts(this.req)
}

function fastifyAcceptHeader (fastify, options, done) {
  fastify.decorateRequest('accepts', acceptsMethod)

  done()
}

module.exports = fp(fastifyAcceptHeader, '>= 0.25.0')
