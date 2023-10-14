import { SpotifyArtistRelease } from 'src/data-retriever/entities/spotify/sp_artist_release.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class SpotifyArtistReleaseSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(SpotifyArtistRelease);

            const SpotifyArtistEntityFactory = await factoryManager.get(SpotifyArtistRelease);

            await SpotifyArtistEntityFactory.save();
    }
}

