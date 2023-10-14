import { setSeederFactory } from 'typeorm-extension';
import { BeatportTrackMedia } from 'src/data-retriever/entities/beatport/bp_track_media.entity'; 
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(BeatportTrackMedia, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const beatportTrackMedia= new BeatportTrackMedia();

  return beatportTrackMedia;
});
