import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllConfigType } from '@/config/config.type';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService<AllConfigType>);
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
