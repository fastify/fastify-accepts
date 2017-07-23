'use strict'

const test = require('tap').test

const plugin = require('./')

const request = require('request')
const Fastify = require('fastify')

const testCases = [
  {
    name: 'no header',
    acceptHeader: '',
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
    name: 'simple',
    acceptHeader: 'text/html',
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
    name: 'complex',
    acceptHeader: 'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8',
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
  }
]

test('accept header', t => {
  t.plan(testCases.length)

  const fastify = Fastify()
  fastify.register(plugin)

  fastify.get('/', function (req, reply) {
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
