import { BeatportLabelArtist } from 'src/data-retriever/entities/beatport/bp_label_artist.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportLabelArtistSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportLabelArtist);

            const BeatportLabelArtistFactory = await factoryManager.get(BeatportLabelArtist);

            await BeatportLabelArtistFactory.save();
    }
}
