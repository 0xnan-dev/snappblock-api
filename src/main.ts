import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ApiModule } from './api.module';
import { swaggerDocumentOptions, swaggerPath, swaggerSetupOptions } from './swagger';
import express from 'express';

const { PORT = 3000, NODE_ENV = 'development' } = process.env;
const isDev = NODE_ENV === 'development';

export async function createApp() {
  const expressApp = express();
  const app = await NestFactory.create(ApiModule, new ExpressAdapter(expressApp), {
    bufferLogs: true,
  });

  if (isDev) {
    app.useLogger(app.get(Logger));
  }

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  app.enableCors();

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);

  SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions);

  return app;
}

async function bootstrap() {
  const app = await createApp();

  await app.listen(PORT);
}

module.exports = bootstrap();
