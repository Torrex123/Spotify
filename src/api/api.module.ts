import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioFeatures } from '../data-retriever/entities/audio/audio_features.entity';
import { SpotifyArtistRelease } from '../data-retriever/entities/spotify/sp_artist_release.entity';
import { SpotifyArtistTrackEntity } from '../data-retriever/entities/spotify/sp_artist_track.entity';
import { SpotifyArtistEntity } from '../data-retriever/entities/spotify/sp_artist.entity';
import { SpotifyReleaseEntity } from '../data-retriever/entities/spotify/sp_release.entity';
import { SpotifyTrackEntity } from '../data-retriever/entities/spotify/sp_track.entity';

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
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
