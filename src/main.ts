import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({

    origin: true,
    methods: 'GET, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true

    })

  await app.listen(3000);

  console.log(`Application running on: ${await app.getUrl()}`)
}
bootstrap();
