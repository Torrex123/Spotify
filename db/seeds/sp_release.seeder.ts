import { SpotifyReleaseEntity } from 'src/data-retriever/entities/spotify/sp_release.entity'; 
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class SpotifyReleaseEntitySeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(SpotifyReleaseEntity);

            const SpotifyReleaseEntityFactory = await factoryManager.get(SpotifyReleaseEntity);

            await SpotifyReleaseEntityFactory.save();
    }
}

