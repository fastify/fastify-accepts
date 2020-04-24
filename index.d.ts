import { Accepts } from "accepts"
import { FastifyPlugin } from "fastify"

declare module "fastify" {
  interface FastifyRequestInterface extends Accepts {
    accepts(): Accepts
  }

  interface FastifyReplyInterface {
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

export interface FastifyAcceptsOptions {
  decorateReply: boolean
}

declare const fastifyAccepts: FastifyPlugin<FastifyAcceptsOptions>

export default fastifyAccepts
