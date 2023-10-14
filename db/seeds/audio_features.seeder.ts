import { AudioFeatures } from '../../src/data-retriever/entities/audio/audio_features.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class AudioFeaturesSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(AudioFeatures);

            /*repository.insert({
                acousticness: 0.659,
                danceability: 0.499,
                duration_ms: 219827,
                energy: 0.23,
                isrc: 'GBAYE9300099',
                key: 5,
                liveness: 0.159,
                loudness: -14.505,
                mode: 1,
            })*/

            const AudioFeaturesFactory = await factoryManager.get(AudioFeatures);

            await AudioFeaturesFactory.saveMany(1);
    }
}
