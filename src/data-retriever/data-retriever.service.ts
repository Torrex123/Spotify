import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioFeatures } from './entities/audio/audio_features.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DataRetrieverService {

    constructor(@InjectRepository(AudioFeatures) private audioRepository: Repository<AudioFeatures>) {}

    async retrieveData() {
        const data = await this.audioRepository.clear()
        return data
    }
}
