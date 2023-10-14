import { setSeederFactory } from 'typeorm-extension';
import { BeatportGenre } from 'src/data-retriever/entities/beatport/bp_genre.entity';
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(BeatportGenre, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const beatportGenre = new BeatportGenre();

  return beatportGenre;
});
