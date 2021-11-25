/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Joi from '@hapi/joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production', 'test')
    .default('production'),
  PORT: Joi.number().port().default(3000),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRATION: Joi.alternatives(Joi.string(), Joi.number()).default('24d'),
  MONGO_CONNECTION: Joi.string().default('mongodb').required(),
  MONGO_DATABASE: Joi.string().required(),
  MONGO_PORT: Joi.string().default('27017').required(),
  MONGO_HOST: Joi.string().required(),
});

export interface Config {
  jwtSecretKey: string;
  jwtExpiresIn: string;
  mongo: {
    connection: string;
    dbName: string;
    port: string;
    host: string;
    user?: string;
    password?: string;
  };
}

export const configFactory = (): Config => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY!,
  jwtExpiresIn: process.env.JWT_EXPIRATION!,
  mongo: {
    connection: process.env.MONGO_CONNECTION!,
    dbName: process.env.MONGO_DATABASE!,
    port: process.env.MONGO_PORT!,
    host: process.env.MONGO_HOST!,
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
  },
});
