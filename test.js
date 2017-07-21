'use strict'

const test = require('tap').test

const plugin = require('./')

const request = require('request')
const Fastify = require('fastify')

const testCases = [
  {
    name: 'no header',
    acceptHeader: '',
    expected: { types: [] }
  },
  {
    name: 'simple',
    acceptHeader: 'text/html',
    expected: { types: ['text/html'] }
  },
  {
    name: 'complex',
    acceptHeader: 'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8',
    expected: {
      types: [
        'text/html',
        'application/xhtml+xml',
        'application/xml',
        '*/*'
      ]
    }
  }
]

test('accept header', t => {
  t.plan(testCases.length)

  const fastify = Fastify()
  fastify.register(plugin)

  fastify.get('/', function (req, reply) {
    const acceptObject = req.accepts()
    reply.send({
      types: acceptObject.types()
    })
  })

  fastify.listen(0, function () {
    const url = `http://localhost:${fastify.server.address().port}/`

    testCases.forEach(function (testCase) {
      t.test(testCase.name, (t) => {
        t.plan(2)
        request({
          url: url,
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

  fastify.server.unref()
})
