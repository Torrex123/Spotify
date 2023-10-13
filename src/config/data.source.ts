import { ConfigModule, ConfigService } from '@nestjs/config';
import { SpotifyArtistEntity } from 'src/data-retriever/entities/spotify/sp_artist.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [SpotifyArtistEntity],
    migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
    synchronize: true,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(DataSourceConfig);
