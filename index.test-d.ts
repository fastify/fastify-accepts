import fastify from "fastify"
import accepts from "."

const app = fastify()

app.register(accepts)

app.get("/", (request, reply) => {
  request.accepts()

  request.charset()
  request.charsets()
  request.encoding()
  request.encodings()
  request.language()
  request.languages()
  request.type()
  request.types()

  request.charset(["aa", "aa"])
  request.charsets(["aa", "aa"])
  request.encoding(["aa", "aa"])
  request.encodings(["aa", "aa"])
  request.language(["aa", "aa"])
  request.languages(["aa", "aa"])
  request.type(["aa", "aa"])
  request.types(["aa", "aa"])

  request.charset("aa", "aa")
  request.charsets("aa", "aa")
  request.encoding("aa", "aa")
  request.encodings("aa", "aa")
  request.language("aa", "aa")
  request.languages("aa", "aa")
  request.type("aa", "aa")
  request.types("aa", "aa")

  reply.requestAccepts()

  reply.requestCharset()
  reply.requestCharsets()
  reply.requestEncoding()
  reply.requestEncodings()
  reply.requestLanguage()
  reply.requestLanguages()
  reply.requestType()
  reply.requestTypes()

  reply.requestCharset(["aa", "aa"])
  reply.requestCharsets(["aa", "aa"])
  reply.requestEncoding(["aa", "aa"])
  reply.requestEncodings(["aa", "aa"])
  reply.requestLanguage(["aa", "aa"])
  reply.requestLanguages(["aa", "aa"])
  reply.requestType(["aa", "aa"])
  reply.requestTypes(["aa", "aa"])

  reply.requestCharset("aa", "aa")
  reply.requestCharsets("aa", "aa")
  reply.requestEncoding("aa", "aa")
  reply.requestEncodings("aa", "aa")
  reply.requestLanguage("aa", "aa")
  reply.requestLanguages("aa", "aa")
  reply.requestType("aa", "aa")
  reply.requestTypes("aa", "aa")

  reply.send({ hello: "world" })
})
