// code snippet taken from here:
// https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
import { PrismaClient } from "@prisma/client"

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient()
  }

  // @ts-ignore
  prisma = global.prisma
}

export default prisma