import { Accepts } from "accepts"
import { FastifyPluginCallback } from "fastify"

declare module "fastify" {
  interface FastifyRequest extends Accepts {
    accepts(): Accepts
  }

  interface FastifyReply {
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
type FastifyAccepts = FastifyPluginCallback<fastifyAccepts.FastifyAcceptsOptions>

declare namespace fastifyAccepts {
  export interface FastifyAcceptsOptions {
    decorateReply: boolean
  }

  export const fastifyAccepts: FastifyAccepts
  export { fastifyAccepts as default }
}

declare function fastifyAccepts(...params: Parameters<FastifyAccepts>): ReturnType<FastifyAccepts>
export = fastifyAccepts
