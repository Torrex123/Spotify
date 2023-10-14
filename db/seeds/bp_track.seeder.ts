import { BeatportTrack } from 'src/data-retriever/entities/beatport/bp_track.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportTrackSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportTrack);

            const BeatportTrackFactory = await factoryManager.get(BeatportTrack);

            await BeatportTrackFactory.save();
    }
}

