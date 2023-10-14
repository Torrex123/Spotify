import { setSeederFactory } from 'typeorm-extension';
import { BeatportKey } from 'src/data-retriever/entities/beatport/bp_key.entity'; 
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(BeatportKey, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const beatportKey = new BeatportKey();

  return beatportKey;
});
