import { Injectable } from '@nestjs/common';
import { DataRetrieverService } from 'src/data-retriever/data-retriever.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { AudioFeatures } from 'src/data-retriever/entities/audio/audio_features.entity';
import { SpotifyArtistRelease } from '../data-retriever/entities/spotify/sp_artist_release.entity';
import { SpotifyArtistTrackEntity } from '../data-retriever/entities/spotify/sp_artist_track.entity';
import { SpotifyArtistEntity } from '../data-retriever/entities/spotify/sp_artist.entity';
import { SpotifyReleaseEntity } from '../data-retriever/entities/spotify/sp_release.entity';
import { SpotifyTrackEntity } from '../data-retriever/entities/spotify/sp_track.entity';


@Injectable()
export class ApiService {

    constructor(@InjectRepository(SpotifyArtistRelease) private readonly spotifyArtistRelease: Repository<SpotifyArtistRelease>,
    @InjectRepository(AudioFeatures) private readonly audioFeatures: Repository<AudioFeatures>,
    @InjectRepository(SpotifyReleaseEntity) private readonly spotifyReleaseEntity: Repository<SpotifyReleaseEntity>,
    @InjectRepository(SpotifyTrackEntity) private readonly spotifyTrackEntity: Repository<SpotifyTrackEntity>) {}


    async scatterDanceabilityLoudness() {

        const danceabilityLoudness = await this.audioFeatures.find({
            select: ['danceability', 'loudness'],
        });

        const transformedData = danceabilityLoudness.map(item => ({
            x: item.danceability,
            y: item.loudness,
        }));
    
        return transformedData;
    
    }

    async getAlbumTypeDistribution() {
        const albumTypeDistribution = await this.spotifyReleaseEntity
          .createQueryBuilder('sp_release')
          .select('sp_release.albumType as albumType, COUNT(sp_release.albumType) as count')
          .groupBy('sp_release.albumType')
          .getRawMany();
    
        // Calculate total count
        const totalCount = albumTypeDistribution.reduce((sum, albumType) => sum + albumType.count, 0);
    
        // Calculate percentages and format the result
        const result = albumTypeDistribution.map(item => ({
          albumType: item.albumType,
          percentage: (item.count / totalCount) * 100,
        }));
    
        return result;
    }

    async top10ArtistByTrackNumber() {
        const top10Artists = await this.spotifyReleaseEntity
            .createQueryBuilder('sp_release')
            .select('sp_artist.artist_name as artistName, SUM(sp_release.total_tracks) as trackCount')
            .innerJoin('sp_release.artist_releases', 'artist_release')
            .innerJoin('artist_release.artist', 'sp_artist')
            .groupBy('sp_artist.artist_name')
            .orderBy('trackCount', 'DESC')
            .limit(10)
            .getRawMany();
    
        return top10Artists;
    }


    async getMostPopularRelease() {
        const popularRelease = await this.spotifyReleaseEntity.findOne({
            where: {
                popularity: MoreThanOrEqual(50) && LessThanOrEqual(87),
            },
            order: {
                popularity: 'DESC',
            },
        });
        return popularRelease;
    }

}
