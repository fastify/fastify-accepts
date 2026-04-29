import fastify from 'fastify'
import { expect } from 'tstyche'
import accepts from '..'

const app = fastify()

app.register(accepts)
app.register(accepts, { decorateReply: true })
app.register(accepts, { decorateReply: false })

app.get('/', (request, reply) => {
  const accept = request.accepts()

  expect(accept.charsets()).type.toBe<string[]>()
  expect(accept.charset()).type.toBe<string[]>()

  expect(accept.charset('json', 'text')).type.toBe<string | false>()
  expect(accept.charset(['json', 'text'])).type.toBe<string | false>()

  // Encoding
  expect(accept.encodings()).type.toBe<string[]>()
  expect(accept.encoding()).type.toBe<string[]>()
  expect(accept.encoding('json', 'text')).type.toBe<string | false>()
  expect(accept.encoding(['json', 'text'])).type.toBe<string | false>()

  // Languages
  expect(accept.languages()).type.toBe<string[]>()
  expect(accept.language()).type.toBe<string[]>()
  expect(accept.language('json', 'text')).type.toBe<string | false>()
  expect(accept.language(['json', 'text'])).type.toBe<string | false>()

  // Types
  expect(accept.types()).type.toBe<string[] | string | false>()
  expect(accept.type()).type.toBe<string[] | string | false>()
  expect(accept.type('json', 'text')).type.toBe<string[] | string | false>()
  expect(accept.type(['json', 'text'])).type.toBe<string[] | string | false>()

  expect(request.charset()).type.toBe<string[]>()
  expect(request.charsets()).type.toBe<string[]>()
  expect(request.encoding()).type.toBe<string[]>()
  expect(request.encodings()).type.toBe<string[]>()
  expect(request.language()).type.toBe<string[]>()
  expect(request.languages()).type.toBe<string[]>()

  expect(request.type()).type.toBe<string[] | string | false>()
  expect(request.types()).type.toBe<string[] | string | false>()

  request.charset(['aa', 'aa'])
  request.charsets(['aa', 'aa'])
  request.encoding(['aa', 'aa'])
  request.encodings(['aa', 'aa'])
  request.language(['aa', 'aa'])
  request.languages(['aa', 'aa'])
  request.type(['aa', 'aa'])
  request.types(['aa', 'aa'])

  expect(reply.requestAccepts()).type.toBe(request.accepts())

  expect(reply.requestCharset()).type.toBe<string[]>()
  expect(reply.requestCharsets()).type.toBe<string[]>()
  expect(reply.requestEncoding()).type.toBe<string[]>()
  expect(reply.requestEncodings()).type.toBe<string[]>()
  expect(reply.requestLanguage()).type.toBe<string[]>()
  expect(reply.requestLanguages()).type.toBe<string[]>()

  expect(reply.requestType()).type.toBe<string[] | string | false>()
  expect(reply.requestTypes()).type.toBe<string[] | string | false>()

  reply.send({ hello: 'world' })
})
