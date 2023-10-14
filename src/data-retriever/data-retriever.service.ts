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
        const data = await this.audioRepository.find({ select: {acousticness: true} })

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

            console.log(csvData.length)

            const totalSize = 2343000
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

                    j++

                }

                i += 1
                j = 0

            }

            console.log("terminado")
        });
    }
}
