export const environment = {
  port: parseInt(process.env.PORT ?? '4000'),
  host: process.env.HOST ?? 'localhost',
  apiKey: process.env.API_KEY ?? '',
  mongoUrl: process.env.MONGO_URL ?? '',
  mongoDb: process.env.MONGO_DB ?? '',
  bcryptSalt: parseInt(process.env.BCRYPT_SALT ?? '10'),
}