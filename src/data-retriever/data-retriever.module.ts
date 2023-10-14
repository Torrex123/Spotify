import { Module } from '@nestjs/common';
import { DataRetrieverController } from './data-retriever.controller';
import { DataRetrieverService } from './data-retriever.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioFeatures } from './entities/audio/audio_features.entity';
import { SpotifyArtistRelease } from './entities/spotify/sp_artist_release.entity';
import { SpotifyArtistTrackEntity } from './entities/spotify/sp_artist_track.entity';
import { SpotifyArtistEntity } from './entities/spotify/sp_artist.entity';
import { SpotifyReleaseEntity } from './entities/spotify/sp_release.entity';
import { SpotifyTrackEntity } from './entities/spotify/sp_track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
                              AudioFeatures,
                              SpotifyArtistRelease,
                              SpotifyArtistTrackEntity,
                              SpotifyArtistEntity,
                              SpotifyReleaseEntity,
                              SpotifyTrackEntity
                            ])
  ],
  controllers: [DataRetrieverController],
  providers: [DataRetrieverService]
})
export class DataRetrieverModule {}
