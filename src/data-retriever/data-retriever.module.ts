import { Module } from '@nestjs/common';
import { DataRetrieverController } from './data-retriever.controller';
import { DataRetrieverService } from './data-retriever.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioFeatures } from './entities/audio/audio_features.entity';
import { BeatportArtist } from './entities/beatport/bp_artist.entity';
import { BeatportTrack } from './entities/beatport/bp_track.entity';
import { BeatportArtistMedia } from './entities/beatport/bp_artist_media.entity';
import { BeatportArtistRelease } from './entities/beatport/bp_artist_release.entity';
import { BeatportArtistTrack } from './entities/beatport/bp_artist_track.entity';
import { BeatportGenre } from './entities/beatport/bp_genre.entity';
import { BeatportKey } from './entities/beatport/bp_key.entity';
import { BeatportLabelArtist } from './entities/beatport/bp_label_artist.entity';
import { BeatportLabelMedia } from './entities/beatport/bp_label_media.entity';
import { BeatportLabel } from './entities/beatport/bp_label.entity';
import { BeatportReleaseMedia } from './entities/beatport/bp_release_media.entity';
import { BeatportRelease } from './entities/beatport/bp_release.entity';
import { BeatportSubgenre } from './entities/beatport/bp_subgenre.entity';
import { BeatportTrackMedia } from './entities/beatport/bp_track_media.entity';
import { SpotifyArtistRelease } from './entities/spotify/sp_artist_release.entity';
import { SpotifyArtistTrackEntity } from './entities/spotify/sp_artist_track.entity';
import { SpotifyArtistEntity } from './entities/spotify/sp_artist.entity';
import { SpotifyReleaseEntity } from './entities/spotify/sp_release.entity';
import { SpotifyTrackEntity } from './entities/spotify/sp_track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AudioFeatures, BeatportArtistMedia, BeatportArtistRelease, BeatportArtistTrack,
      BeatportArtist, BeatportGenre, BeatportKey, BeatportLabelArtist, BeatportLabelMedia, BeatportLabel,
      BeatportReleaseMedia, BeatportRelease, BeatportSubgenre, BeatportTrackMedia, BeatportTrack, SpotifyArtistRelease,
      SpotifyArtistTrackEntity, SpotifyArtistEntity, SpotifyReleaseEntity, SpotifyTrackEntity])
  ],
  controllers: [DataRetrieverController],
  providers: [DataRetrieverService]
})
export class DataRetrieverModule {}
