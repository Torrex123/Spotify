import { SpotifyArtistTrackEntity } from 'src/data-retriever/entities/spotify/sp_artist_track.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class SpotifyArtistTrackEntitySeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(SpotifyArtistTrackEntity);

            const SpotifyArtistTrackEntityFactory = await factoryManager.get(SpotifyArtistTrackEntity);

            await SpotifyArtistTrackEntityFactory.save();
    }
}

