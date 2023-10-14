import { setSeederFactory } from 'typeorm-extension';
import { BeatportArtist } from 'src/data-retriever/entities/beatport/bp_artist.entity'; 
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(BeatportArtist, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const beatportArtist = new BeatportArtist();

  return beatportArtist;
});