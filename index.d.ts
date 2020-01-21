import { Accepts } from "accepts"
import * as fastify from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"

declare module "fastify" {
  interface FastifyRequest<HttpRequest> {
    accepts(): Accepts
    charset: Accepts["charset"]
    charsets: Accepts["charsets"]
    encoding: Accepts["encoding"]
    encodings: Accepts["charsets"]
    language: Accepts["language"]
    languages: Accepts["languages"]
    type: Accepts["type"]
    types: Accepts["types"]
  }

  interface FastifyReply<HttpResponse> {
    requestAccepts(): Accepts
    requestCharset: Accepts["charset"]
    requestCharsets: Accepts["charsets"]
    requestEncoding: Accepts["encoding"]
    requestEncodings: Accepts["charsets"]
    requestLanguage: Accepts["language"]
    requestLanguages: Accepts["languages"]
    requestType: Accepts["type"]
    requestTypes: Accepts["types"]
  }
}

export const fastifyAccepts: fastify.Plugin<
  Server,
  IncomingMessage,
  ServerResponse,
  {}
>

export default fastifyAccepts
