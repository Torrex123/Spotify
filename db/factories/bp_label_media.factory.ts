import { setSeederFactory } from 'typeorm-extension';
import { BeatportLabelMedia } from 'src/data-retriever/entities/beatport/bp_label_media.entity'; 
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(BeatportLabelMedia, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const beatportLabelMedia = new BeatportLabelMedia();

  return beatportLabelMedia;
});

