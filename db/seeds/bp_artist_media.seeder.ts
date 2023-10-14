import { BeatportArtistMedia } from 'src/data-retriever/entities/beatport/bp_artist_media.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportArtistMediaSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportArtistMedia);

            const BeatportArtistMediaFactory = await factoryManager.get(BeatportArtistMedia);

            await BeatportArtistMediaFactory.save();
    }
}
