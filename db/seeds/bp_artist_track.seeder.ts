import { BeatportArtistTrack } from 'src/data-retriever/entities/beatport/bp_artist_track.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportArtistTrackSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportArtistTrack);

            const BeatportArtistTrackFactory = await factoryManager.get(BeatportArtistTrack);

            await BeatportArtistTrackFactory.save();
    }
}
