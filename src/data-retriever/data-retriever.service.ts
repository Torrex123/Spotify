import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioFeatures } from './entities/audio/audio_features.entity';
import { SpotifyArtistEntity } from './entities/spotify/sp_artist.entity';
import { SpotifyArtistTrackEntity } from './entities/spotify/sp_artist_track.entity';
import { SpotifyTrackEntity } from './entities/spotify/sp_track.entity'; 
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { parse } from 'csv-parse';

@Injectable()
export class DataRetrieverService {

    constructor(@InjectRepository(AudioFeatures) private readonly audioRepository: Repository<AudioFeatures>,
                @InjectRepository(SpotifyArtistEntity) private readonly spotifyArtistEntityRepository: Repository<SpotifyArtistEntity>,
                @InjectRepository(SpotifyArtistTrackEntity) private readonly spotifyArtistTrackEntityRepository: Repository<SpotifyArtistTrackEntity>,
                @InjectRepository(SpotifyTrackEntity) private readonly spotifyTrackEntityRepository: Repository<SpotifyTrackEntity>,
                private readonly logger: Logger) {}

    async retrieveData() {
        const data = await this.audioRepository.find({ select: {acousticness: true} })

        return data
    }

    async seedAudioFeatures() {

            const csvData = await this.readCSVFile('csv_files/audio_features.csv')

            const totalSize = 2000000
            const batchSize = 500000

            const totalLoops = Math.ceil(totalSize / batchSize)

            let i = 0
            let contador = 0
            let j = 0
            
            while (i < totalLoops - 1) {

                console.log("loop " + i)

                while (j < batchSize) {

                    const data = csvData.pop()

                    if (data === undefined) break

                    console.log(contador)
                    contador += 1

                    this.audioRepository.save(data)

                    j++

                }

                i += 1
                j = 0

            }

            console.log("terminado")
        
    }


    async seedspotifyArtist(){
        const results = await this.readCSVFile('csv_files/sp_artist_track.csv')

        const totalSize = 2000000
        const batchSize = 500000

        const totalLoops = Math.ceil(totalSize / batchSize)

        let i = 0
        let contador = 0
        let j = 0

        while (i < totalLoops - 1) {

            console.log("loop " + i)

            while (j < batchSize) {

                const data = results.pop()

                if (data === undefined) break

                console.log(contador)
                contador += 1

                this.spotifyArtistEntityRepository.save(data)

                j++
                
            }

            i += 1
            j = 0

        }

    }

    async seedspotifyArtistTrack(){
        const results = await this.readCSVFile('csv_files/sp_artist_track.csv')

        const totalSize = 2000000
        const batchSize = 500000
        
        const totalLoops = Math.ceil(totalSize / batchSize)

        let i = 0
        let contador = 0
        let j = 0

        while (i < totalLoops - 1) {

            console.log("loop " + i)

            while (j < batchSize) {

                const data = results.pop()

                if (data === undefined) break

                console.log(contador)
                contador += 1

                this.spotifyArtistTrackEntityRepository.save(data)

                j++
                
            }

            i += 1
            j = 0

        }

        return "terminado"
    }

    async seedspotifyTrack(){
        const results = await this.readCSVFile('csv_files/sp_track.csv')

        const totalSize = 2000000
        const batchSize = 500000
        
        const totalLoops = Math.ceil(totalSize / batchSize)

        let i = 0
        let contador = 0
        let j = 0

        while (i < totalLoops - 1) {

            console.log("loop " + i)

            while (j < batchSize) {

                const data = results.pop()

                if (data === undefined) break

                console.log(contador)
                contador += 1

                this.spotifyTrackEntityRepository.save(data)

                j++
                
            }

            i += 1
            j = 0

        }

        return "terminado"
    }

    async readCSVFile(filePath: string): Promise<any[]> {

        return new Promise<any[]>((resolve, reject) => {

          const csvData: any[] = [];

          this.logger.log('Reading CSV file...');

            fs.createReadStream(filePath)
            .pipe(parse({ delimiter: ',', columns: true }))
            .on('data', (row) => {

              csvData.push(row);

            })
            .on('end', () => {

              this.logger.log('CSV file successfully processed.');
              resolve(csvData);

            })
            .on('error', (error) => {

              reject(error);

            });
        });
      }
}

