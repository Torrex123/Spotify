import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';

import AudioFeaturesFactory from 'db/factories/audio_features.factory';

import AudioFeaturesSeeder from './audio_features.seeder';

export default class InitSeeder implements Seeder {

    public async run(

      dataSource: DataSource,
      factoryManager: SeederFactoryManager,

    ): Promise<any> {

      await runSeeders(dataSource, {

        seeds: [AudioFeaturesSeeder],
        factories: [AudioFeaturesFactory],

      });
    }
  }
