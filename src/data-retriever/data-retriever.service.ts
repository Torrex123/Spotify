import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioFeatures } from './entities/audio/audio_features.entity';
import { Repository } from 'typeorm';
import fs from 'fs';
import { parse } from 'csv-parse';

@Injectable()
export class DataRetrieverService {

    constructor(@InjectRepository(AudioFeatures) private readonly audioRepository: Repository<AudioFeatures>) {}

    async retrieveData() {
        const data = await this.audioRepository.clear()
        return data
    }

    async seedAudioFeatures() {

        const csvFilePath = '/home/azureuser/backend-fibodev/Spotify/src'
        const csvData = []

        console.log(csvFilePath)

        fs.createReadStream(csvFilePath)
        .pipe(parse({ delimiter: ',', columns: true }))
        .on('data', (row) => {
        csvData.push(row);
        console.log(row);
      })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
    }
}
