import { SpotifyTrackEntity } from 'src/data-retriever/entities/spotify/sp_track.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class SpotifyTrackEntitySeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(SpotifyTrackEntity);

            const SpotifyTrackEntityFactory = await factoryManager.get(SpotifyTrackEntity);

            await SpotifyTrackEntityFactory.save();
    }
}

