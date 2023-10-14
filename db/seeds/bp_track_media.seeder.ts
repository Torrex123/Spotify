import { BeatportTrackMedia } from 'src/data-retriever/entities/beatport/bp_track_media.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportTrackMediaSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportTrackMedia);

            const BeatportTrackMediaFactory = await factoryManager.get(BeatportTrackMedia);

            await BeatportTrackMediaFactory.save();
    }
}

