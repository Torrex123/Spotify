import { BeatportLabelMedia } from 'src/data-retriever/entities/beatport/bp_label_media.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportLabelMediaSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportLabelMedia);

            const BeatportLabelMediaFactory = await factoryManager.get(BeatportLabelMedia);

            await BeatportLabelMediaFactory.save();
    }
}
