/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Joi from '@hapi/joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production', 'test')
    .default('production'),
  PORT: Joi.number().port().default(3000),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRATION: Joi.alternatives(Joi.string(), Joi.number()).default('24d'),
  AUTH_MESSAGE: Joi.string().required(),
});

export interface Config {
  jwtSecretKey: string;
  jwtExpiresIn: string;
  auth: {
    message: string;
  };
}

export const configFactory = (): Config => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY!,
  jwtExpiresIn: process.env.JWT_EXPIRATION!,
  auth: {
    message: process.env.AUTH_MESSAGE!,
  },
});
