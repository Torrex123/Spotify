import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { DataRetrieverModule } from './data-retriever/data-retriever.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    DataRetrieverModule
  ]
})
export class AppModule {}
