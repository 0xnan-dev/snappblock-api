import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerPath = 'doc';

export const swaggerDocumentOptions = new DocumentBuilder()
  .setTitle('SnapBlock APIs')
  .setDescription('API to communicates with ISCN and IPFS')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const swaggerSetupOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'SnapBlock APIs',
};
