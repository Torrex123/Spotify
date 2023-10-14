import { AudioFeatures } from 'src/data-retriever/entities/audio/audio_features.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class AudioFeaturesSeeder implements Seeder {

    public async run(

        dataSource: DataSource,
        factoryManager: SeederFactoryManager

        ): Promise<any> {

            const repository = dataSource.getRepository(AudioFeatures);

            const AudioFeaturesFactory = await factoryManager.get(AudioFeatures);

            await AudioFeaturesFactory.save();
    }
}
