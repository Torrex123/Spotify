import { BeatportSubgenre } from 'src/data-retriever/entities/beatport/bp_subgenre.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportGenreSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportSubgenre);

            const BeatportSubgenreFactory = await factoryManager.get(BeatportSubgenre);

            await BeatportSubgenreFactory.save();
    }
}
