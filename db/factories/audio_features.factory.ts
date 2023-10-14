import { setSeederFactory } from 'typeorm-extension';
import { AudioFeatures } from '../../src/data-retriever/entities/audio/audio_features.entity';
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(AudioFeatures, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  /*fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
    });*/

  const audioFeatures = new AudioFeatures();

  audioFeatures.acousticness = 0.659;
  audioFeatures.danceability = 0.499;
  audioFeatures.duration_ms = 219827;
  audioFeatures.energy = 0.23;
  audioFeatures.isrc = 'GBAYE9300099';
  audioFeatures.key = 5;
  audioFeatures.liveness = 0.159;
  audioFeatures.loudness = -14.505;
  audioFeatures.mode = 1;

    return audioFeatures;
});
