import { setSeederFactory } from 'typeorm-extension';
import { BeatportArtistTrack } from 'src/data-retriever/entities/beatport/bp_artist_track.entity'; 
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(BeatportArtistTrack , async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const beatportArtistTrack  = new BeatportArtistTrack ();

  return beatportArtistTrack;
});

