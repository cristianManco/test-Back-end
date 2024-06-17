import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 3000;

  app.setGlobalPrefix('/api');
  app.enableCors();
  app.use(cors());
  const config = new DocumentBuilder()
    .setTitle('APi Torneos')
    .setDescription(
      'Company dedicated to the management of video game tournaments in Colombia, has the need to implement an API for tournament management.',
    )
    .setVersion('1.0')
    .addBearerAuth() // Adds support for Bearer authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
  console.log(`The application is running in: http://localhost:${port}/api\n`);
  console.log(
    `the swagger app is running in: http://localhost:${port}/api/docs`,
  );
}
bootstrap();
