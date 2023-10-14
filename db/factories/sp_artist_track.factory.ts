import { setSeederFactory } from 'typeorm-extension';
import { SpotifyArtistTrackEntity } from 'src/data-retriever/entities/spotify/sp_artist_track.entity';
import fs from 'fs';
import { parse } from 'csv-parse';


export default setSeederFactory(SpotifyArtistTrackEntity, async () => {

  const csvData = [];

  const csvFilePath = "csv_files/audio_features.csv"

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',' , columns: true}))
    .on('data', (row) => {
      csvData.push(row);
      console.log(row);
    });

  const spotifyArtistTrackEntity = new SpotifyArtistTrackEntity();

  return spotifyArtistTrackEntity;
});

