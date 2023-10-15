import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioFeatures } from './entities/audio/audio_features.entity';
import { In, Repository } from 'typeorm';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Logger } from '@nestjs/common';
import { SpotifyArtistRelease } from './entities/spotify/sp_artist_release.entity';
import { SpotifyReleaseEntity } from './entities/spotify/sp_release.entity';

@Injectable()
export class DataRetrieverService {

    constructor(@InjectRepository(AudioFeatures) private readonly audioRepository: Repository<AudioFeatures>,
                @InjectRepository(SpotifyArtistRelease) private readonly spotifyArtistReleaseRepository: Repository<SpotifyArtistRelease>,
                @InjectRepository(SpotifyReleaseEntity) private readonly spotifyReleaseRepository: Repository<SpotifyReleaseEntity>,
                                                        private readonly logger: Logger) {}

    async retrieveData() {
        //const data = await this.audioRepository.find({ select: {acousticness: true} })
        return this.spotifyArtistReleaseRepository.find({ select: {artistId: true, releaseId: true} })
        //return data
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

    async seedAudioFeatures() {

        const csvFilePath = 'csv_files/audio_features.csv'
        const csvData = await this.readCSVFile(csvFilePath)

        const totalSize = 2000000
        const batchSize = 500000

        const totalLoops = Math.ceil(totalSize / batchSize)

        let i = 0
        let contador = 0
        let j = 0

        this.logger.log('Seeding audio features...');

        while (i < totalLoops) {

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

        this.logger.log('Audio features successfully seeded.');
    }


    async seedArtistRelease() {

        const csvFilePath = 'csv_files/sp_artist_release.csv'
        const csvData = await this.readCSVFile(csvFilePath)

        const totalSize = 2000000
        const batchSize = 500000

        const totalLoops = Math.ceil(totalSize / batchSize)

        let i = 0
        let contador = 0
        let j = 0

        this.logger.log('Seeding Artist releases...');

        while (i < totalLoops) {

            console.log("loop " + i)

            while (j < batchSize) {

                const data = csvData.pop()

                if (data === undefined) break

                console.log(contador)
                contador += 1

                this.spotifyArtistReleaseRepository.save(data)

                j++

            }

            i += 1
            j = 0

        }

        this.logger.log('Artist releases successfully seeded.');

    }

    async seedRelease() {

        const csvFilePath = 'csv_files/sp_release.csv'
        const csvData = await this.readCSVFile(csvFilePath)

        const totalSize = csvData.length
        const batchSize = 500000

        const totalLoops = Math.ceil(totalSize / batchSize)

        let i = 0
        let contador = 0
        let j = 0

        this.logger.log('Seeding releases...');

        while (i < totalLoops) {

            console.log("loop " + i)

            while (j < batchSize) {

                const data = csvData.pop()

                if (data === undefined) break

                console.log(contador)
                contador += 1

                this.spotifyReleaseRepository.save(data)

                j++

            }

            i += 1
            j = 0

        }

        this.logger.log('Releases successfully seeded.');
    }
}
