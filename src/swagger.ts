import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerPath = 'doc';

export const swaggerDocumentOptions = new DocumentBuilder()
  .setTitle('SnappBlock APIs')
  .setDescription('API to communicates with IPFS')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const swaggerSetupOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'SnappBlock APIs',
};
