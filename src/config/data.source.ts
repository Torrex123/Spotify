import { ConfigModule, ConfigService } from '@nestjs/config';
import InitSeeder from 'db/seeds/init.seeder';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();

const options = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: ['dist/src/data-retriever/entities/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
    synchronize: true,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
    seeds: [InitSeeder],
};

export const DataSourceConfig: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: ['dist/src/data-retriever/entities/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
    synchronize: true,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
};


export const AppDS = new DataSource(options as DataSourceOptions & SeederOptions);
