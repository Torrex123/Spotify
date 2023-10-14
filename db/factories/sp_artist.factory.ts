import { setSeederFactory } from 'typeorm-extension';
import { SpotifyArtistEntity } from 'src/data-retriever/entities/spotify/sp_artist.entity'; 
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(SpotifyArtistEntity, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const spotifyArtistEntity = new SpotifyArtistEntity();

  return spotifyArtistEntity;
});

