import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import AudioFeaturesSeeder from './audio_features.seeder';
//import AudioFeaturesFactory from '../factories/audio_features.factory';

export default class InitSeeder implements Seeder {

    public async run(

      dataSource: DataSource,
      factoryManager: SeederFactoryManager,

    ): Promise<any> {

      await runSeeders(dataSource, {

        seeds: [AudioFeaturesSeeder],
        factories: ['AudioFeaturesFactory'],

      });
    }
  }
