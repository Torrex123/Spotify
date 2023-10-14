import { BeatportReleaseMedia } from 'src/data-retriever/entities/beatport/bp_release_media.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportReleaseMediaSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportReleaseMedia);

            const BeatportReleaseMediaFactory = await factoryManager.get(BeatportReleaseMedia);

            await BeatportReleaseMediaFactory.save();
    }
}

