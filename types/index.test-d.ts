import fastify from "fastify"
import accepts from ".."

const app = fastify()

app.register(accepts)

app.get("/", (request, reply) => {
  const accept = request.accepts();

  const charsets = accept.charsets();
  const charsetFromEmpty = accept.charset();
  const charsetFromParams = accept.charset("json", "text");
  const charsetFromArray = accept.charset(["json", "text"]);

  const encodings = accept.encodings();
  const encodingFromEmpty = accept.encoding();
  const encodingFromParams = accept.encoding("json", "text");
  const encodingFromArray = accept.encoding(["json", "text"]);

  const languages = accept.languages();
  const languageFromEmpty = accept.language();
  const languageFromParams = accept.language("json", "text");
  const languageFromArray = accept.language(["json", "text"]);

  const types = accept.types();
  const typeFromEmpty = accept.type();
  const typeFromParams = accept.type("json", "text");
  const typeFromArray = accept.type(["json", "text"]);

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

