import { BeatportLabel } from 'src/data-retriever/entities/beatport/bp_label.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportLabelSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportLabel);

            const BeatportLabelFactory = await factoryManager.get(BeatportLabel);

            await BeatportLabelFactory.save();
    }
}

