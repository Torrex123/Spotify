import { setSeederFactory } from 'typeorm-extension';
import { BeatportTrack } from 'src/data-retriever/entities/beatport/bp_track.entity'; 
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(BeatportTrack, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const beatportTrack = new BeatportTrack();

  return beatportTrack;
});

