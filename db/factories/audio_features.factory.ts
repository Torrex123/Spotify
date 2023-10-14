import { setSeederFactory } from 'typeorm-extension';
import { AudioFeatures } from 'src/data-retriever/entities/audio/audio_features.entity';
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(AudioFeatures, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const audioFeatures = new AudioFeatures();

  return audioFeatures;
});
