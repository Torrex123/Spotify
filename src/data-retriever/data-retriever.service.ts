import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioFeatures } from './entities/audio/audio_features.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { parse } from 'csv-parse';

@Injectable()
export class DataRetrieverService {

    constructor(@InjectRepository(AudioFeatures) private readonly audioRepository: Repository<AudioFeatures>) {}

    async retrieveData() {
        const data = await this.audioRepository.clear()
        return data
    }

    async seedAudioFeatures() {

        const csvFilePath = 'csv_files/audio_features.csv'
        const csvData = []

        console.log(csvFilePath)

        fs.createReadStream(csvFilePath)
        .pipe(parse({ delimiter: ',', columns: true }))
        .on('data', (row) => {

            csvData.push(row);
      })
        .on('end', () => {

            console.log('CSV file successfully processed');

            csvData.forEach((data) => {

            const audioFeatures = new AudioFeatures()

            audioFeatures.isrc = data.isrc
            audioFeatures.acousticness = data.acousticness
            audioFeatures.danceability = data.danceability
            audioFeatures.duration_ms = data.duration_ms
            audioFeatures.energy = data.energy
            audioFeatures.key = data.key
            audioFeatures.liveness = data.liveness
            audioFeatures.loudness = data.loudness
            audioFeatures.mode = data.mode

            this.audioRepository.save(audioFeatures)

            });
        });
    }
}
