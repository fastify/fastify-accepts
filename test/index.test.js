'use strict'

const { test } = require('tap')

const fastifyAccepts = require('..')

const request = require('request')
const Fastify = require('fastify')

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

test('accept header', t => {
  t.plan(testCases.length)

  const fastify = Fastify()
  fastify.register(fastifyAccepts, { decorateReply: true })

  t.teardown(fastify.close.bind(fastify))

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

  fastify.get('/reply', function (req, reply) {
    reply.send({
      types: reply.requestTypes(),
      param1: reply.requestCharsets(['utf1'])
    })
  })

  fastify.listen({ port: 0 }, function () {
    const BASE_URL = `http://localhost:${fastify.server.address().port}`

    testCases.forEach(function (testCase) {
      t.test(testCase.name, (t) => {
        t.plan(2)
        request({
          url: `${BASE_URL}${testCase.url}`,
          headers: {
            accept: testCase.acceptHeader
          },
          json: true
        }, (err, response, body) => {
          t.ok(!err)
          t.strictSame(body, testCase.expected)
        })
      })
    })
  })
})

test('no reply decorator', async function (t) {
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
    t.equal(fastify.hasReplyDecorator('request' + method, false), false)
  }
})
