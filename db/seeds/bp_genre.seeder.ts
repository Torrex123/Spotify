import { BeatportGenre } from 'src/data-retriever/entities/beatport/bp_genre.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportGenreSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportGenre);

            const BeatportGenreFactory = await factoryManager.get(BeatportGenre);

            await BeatportGenreFactory.save();
    }
}
