declare namespace NodeJS {
  export interface Global {
    prisma?: PrismaClient;
  }
}

declare global {
  interface Window {
    gtag: any;
  }
}
