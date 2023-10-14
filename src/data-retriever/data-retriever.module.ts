import { Module } from '@nestjs/common';
import { DataRetrieverController } from './data-retriever.controller';
import { DataRetrieverService } from './data-retriever.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioFeatures } from './entities/audio/audio_features.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AudioFeatures])
  ],
  controllers: [DataRetrieverController],
  providers: [DataRetrieverService]
})
export class DataRetrieverModule {}
