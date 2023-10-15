import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioFeatures } from './entities/audio/audio_features.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { Logger } from '@nestjs/common';
import { SpotifyArtistRelease } from './entities/spotify/sp_artist_release.entity';
import { SpotifyReleaseEntity } from './entities/spotify/sp_release.entity';
import { SpotifyArtistEntity } from './entities/spotify/sp_artist.entity';
import { SpotifyArtistTrackEntity } from './entities/spotify/sp_artist_track.entity';
import { SpotifyTrackEntity } from './entities/spotify/sp_track.entity';

@Injectable()
export class DataRetrieverService {

    constructor(@InjectRepository(AudioFeatures) private readonly audioRepository: Repository<AudioFeatures>,
                @InjectRepository(SpotifyArtistRelease) private readonly spotifyArtistReleaseRepository: Repository<SpotifyArtistRelease>,
                @InjectRepository(SpotifyReleaseEntity) private readonly spotifyReleaseRepository: Repository<SpotifyReleaseEntity>,
                @InjectRepository(SpotifyArtistEntity) private readonly spotifyArtistEntityRepository: Repository<SpotifyArtistEntity>,
                @InjectRepository(SpotifyArtistTrackEntity) private readonly spotifyArtistTrackEntityRepository: Repository<SpotifyArtistTrackEntity>,
                @InjectRepository(SpotifyTrackEntity) private readonly spotifyTrackEntityRepository: Repository<SpotifyTrackEntity>,
                                                        private readonly logger: Logger) {}

    async retrieveData() {
        //const data = await this.audioRepository.find({ select: {acousticness: true} })
        return this.spotifyReleaseRepository.find({select: {labelName: true}})
        //return data
    }

    async seederInit() {

        await this.seedAudioFeatures()
        await this.seedArtistRelease()
        await this.seedRelease()
        await this.seedSpotifyArtist()
        await this.seedSpotifyArtistTrack()
        await this.seedSpotifyTrack()

        return "Seeded successfully"
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

        const totalSize = 500000
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

        const totalSize = 50000
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
        const batchSize = 50000

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


                contador += 1

                this.spotifyReleaseRepository.save(data)

                j++

            }

            i += 1
            j = 0

        }

        this.logger.log('Releases successfully seeded.');
    }

    async seedSpotifyArtist() {

        const results = await this.readCSVFile('csv_files/sp_artist_track.csv')

        const totalSize = 50000
        const batchSize = 500000

        const totalLoops = Math.ceil(totalSize / batchSize)

        let i = 0
        let contador = 0
        let j = 0

        this.logger.log('Seeding artists...');

        while (i < totalLoops) {

            console.log("loop " + i)

            while (j < batchSize) {

                const data = results.pop()

                if (data === undefined) break


                contador += 1

                this.spotifyArtistEntityRepository.save(data)

                j++

            }

            i += 1
            j = 0

        }

        this.logger.log('Artists successfully seeded.');

    }

    async seedSpotifyArtistTrack() {

        const results = await this.readCSVFile('csv_files/sp_artist_track.csv')

        const totalSize = 50000
        const batchSize = 500000

        const totalLoops = Math.ceil(totalSize / batchSize)

        let i = 0
        let contador = 0
        let j = 0

        while (i < totalLoops) {

            console.log("loop " + i)

            while (j < batchSize) {

                const data = results.pop()

                if (data === undefined) break


                contador += 1

                this.spotifyArtistTrackEntityRepository.save(data)

                j++

            }

            i += 1
            j = 0

        }

        this.logger.log('Artists tracks successfully seeded.');
    }

    async seedSpotifyTrack() {

        const results = await this.readCSVFile('csv_files/sp_track.csv')

        const totalSize = 50000
        const batchSize = 500000

        const totalLoops = Math.ceil(totalSize / batchSize)

        this.logger.log('Seeding tracks...');

        let i = 0
        let contador = 0
        let j = 0

        while (i < totalLoops) {

            console.log("loop " + i)

            while (j < batchSize) {

                const data = results.pop()

                if (data === undefined) break


                contador += 1

                this.spotifyTrackEntityRepository.save(data)

                j++

            }

            i += 1
            j = 0

        }

        this.logger.log('Tracks successfully seeded.');
    }
}
