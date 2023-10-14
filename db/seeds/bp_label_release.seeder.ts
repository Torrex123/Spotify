import { BeatportRelease } from 'src/data-retriever/entities/beatport/bp_release.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportReleaseSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportRelease);

            const BeatportReleaseFactory = await factoryManager.get(BeatportRelease);

            await BeatportReleaseFactory.save();
    }
}
