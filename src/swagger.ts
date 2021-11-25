import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerPath = 'doc';

export const swaggerDocumentOptions = new DocumentBuilder()
  .setTitle('GOGOClub APIs')
  .setDescription('API gateway for GOGOClub Microservice')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const swaggerSetupOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'GOGOClub APIs',
};
