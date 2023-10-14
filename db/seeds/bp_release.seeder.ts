import { BeatportKey } from 'src/data-retriever/entities/beatport/bp_key.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportKeySeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportKey);

            const BeatportKeyFactory = await factoryManager.get(BeatportKey);

            await BeatportKeyFactory.save();
    }
}

