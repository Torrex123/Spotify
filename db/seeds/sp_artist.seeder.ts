import { SpotifyArtistEntity } from 'src/data-retriever/entities/spotify/sp_artist.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class SpotifyArtistEntitySeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(SpotifyArtistEntity);

            const SpotifyArtistEntityFactory = await factoryManager.get(SpotifyArtistEntity);

            await SpotifyArtistEntityFactory.save();
    }
}

