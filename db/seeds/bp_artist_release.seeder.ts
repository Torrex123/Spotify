import { BeatportArtistRelease } from 'src/data-retriever/entities/beatport/bp_artist_release.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BeatportArtistReleaseSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(BeatportArtistRelease);

            const BeatportArtistReleaseFactory = await factoryManager.get(BeatportArtistRelease);

            await BeatportArtistReleaseFactory.save();
    }
}
