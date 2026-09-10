'use strict'

const { test } = require('node:test')

const fastifyAccepts = require('..')

const Fastify = require('fastify')

/** @typedef {import('node:test').TestContext} TestContext */

const testCases = [
  {
    name: 'request - no header',
    acceptHeader: '',
    url: '/request',
    expected: {
      types: [],
      charsets: ['*'],
      param1: 'utf1',
      param2: 'utf1',
      param3: 'utf1',
      param4: 'utf1',
      param5: 'utf1'
    }
  },
  {
    name: 'request - simple',
    acceptHeader: 'text/html',
    url: '/request',
    expected: {
      types: ['text/html'],
      charsets: ['*'],
      param1: 'utf1',
      param2: 'utf1',
      param3: 'utf1',
      param4: 'utf1',
      param5: 'utf1'
    }
  },
  {
    name: 'request - complex',
    acceptHeader: 'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8',
    url: '/request',
    expected: {
      types: [
        'text/html',
        'application/xhtml+xml',
        'application/xml',
        '*/*'
      ],
      charsets: ['*'],
      param1: 'utf1',
      param2: 'utf1',
      param3: 'utf1',
      param4: 'utf1',
      param5: 'utf1'
    }
  },
  {
    name: 'reply - no header',
    acceptHeader: '',
    url: '/reply',
    expected: {
      types: [],
      param1: 'utf1'
    }
  },
  {
    name: 'reply - simple',
    acceptHeader: 'text/html',
    url: '/reply',
    expected: {
      types: ['text/html'],
      param1: 'utf1'
    }
  },
  {
    name: 'reply - complex',
    acceptHeader: 'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8',
    url: '/reply',
    expected: {
      types: [
        'text/html',
        'application/xhtml+xml',
        'application/xml',
        '*/*'
      ],
      param1: 'utf1'
    }
  }
]

test('accept header', async (/** @type {TestContext} */ t) => {
  t.plan(testCases.length)

  const fastify = Fastify()
  fastify.register(fastifyAccepts, { decorateReply: true })

  t.after(() => fastify.close())

  fastify.get('/request', function (req, reply) {
    reply.send({
      types: req.types(),
      charsets: req.charsets(),
      param1: req.charsets(['utf1']),
      param2: req.charsets(['utf1', 'utf2']),
      param3: req.charsets(['utf1', 'utf2', 'utf3']),
      param4: req.charsets(['utf1', 'utf2', 'utf3', 'utf4']),
      param5: req.charsets(['utf1', 'utf2', 'utf3', 'utf4', 'utf5'])
    })
  })

  fastify.get('/reply', function (_req, reply) {
    reply.send({
      types: reply.requestTypes(),
      param1: reply.requestCharsets(['utf1'])
    })
  })

  await fastify.ready()

  for (const testCase of testCases) {
    await t.test(testCase.name, async (/** @type {TestContext} */ t) => {
      t.plan(1)

      const result = await fastify.inject({
        url: testCase.url,
        headers: {
          accept: testCase.acceptHeader
        }
      })
      t.assert.deepStrictEqual(result.json(), testCase.expected)
    })
  }
})

test('no reply decorator', async function (/** @type {TestContext} */ t) {
  const fastify = Fastify()
  fastify.register(fastifyAccepts, { decorateReply: false })
  await fastify.ready()

  const methodNames = [
    'Charset', 'Charsets',
    'Encoding', 'Encodings',
    'Language', 'Languages',
    'Type', 'Types'
  ]

  for (const method of methodNames) {
    t.assert.deepStrictEqual(fastify.hasReplyDecorator('request' + method, false), false)
  }
})

test('variadic arguments are forwarded', async function (/** @type {TestContext} */ t) {
  t.plan(1)

  const fastify = Fastify()
  fastify.register(fastifyAccepts, { decorateReply: true })

  t.after(() => fastify.close())

  fastify.get('/', function (req, reply) {
    reply.send({
      type: req.type('json', 'html'),
      typeArray: req.type(['json', 'html']),
      typeNoArgs: req.types(),
      typeUndefined: req.type(undefined),
      typeEmpty: req.type([]),
      charset: req.charset('utf-8', 'iso-8859-1'),
      replyLanguage: reply.requestLanguage('fr', 'en'),
      replyEncoding: reply.requestEncoding(['br', 'gzip'])
    })
  })

  const result = await fastify.inject({
    url: '/',
    headers: {
      accept: 'text/html',
      'accept-charset': 'iso-8859-1',
      'accept-encoding': 'gzip',
      'accept-language': 'en'
    }
  })

  t.assert.deepStrictEqual(result.json(), {
    type: 'html',
    typeArray: 'html',
    typeNoArgs: ['text/html'],
    typeUndefined: ['text/html'],
    typeEmpty: ['text/html'],
    charset: 'iso-8859-1',
    replyLanguage: 'en',
    replyEncoding: 'gzip'
  })
})

test('request and reply decorators share one memoised accepts object', async function (/** @type {TestContext} */ t) {
  t.plan(1)

  const fastify = Fastify()
  fastify.register(fastifyAccepts, { decorateReply: true })

  t.after(() => fastify.close())

  fastify.get('/', function (req, reply) {
    const acceptsObject = reply.requestAccepts()
    reply.send({
      shared: req.accepts() === acceptsObject,
      memoised: req.accepts() === acceptsObject && reply.requestAccepts() === acceptsObject
    })
  })

  const result = await fastify.inject('/')
  t.assert.deepStrictEqual(result.json(), { shared: true, memoised: true })
})
