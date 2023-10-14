import { setSeederFactory } from 'typeorm-extension';
import { BeatportSubgenre } from 'src/data-retriever/entities/beatport/bp_subgenre.entity'; 
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(BeatportSubgenre, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const beatportSubgenre = new BeatportSubgenre();

  return beatportSubgenre;
});
