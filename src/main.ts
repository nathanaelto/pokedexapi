import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Pokedex API')
    .setDescription('Pokemon API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(3000);
}

bootstrap().catch(console.error);
