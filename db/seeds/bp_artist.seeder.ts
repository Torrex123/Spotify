import { BeatportArtist } from 'src/data-retriever/entities/beatport/bp_artist.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportArtistSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportArtist);

            const BeatportArtistFactory = await factoryManager.get(BeatportArtist);

            await BeatportArtistFactory.save();
    }
}
