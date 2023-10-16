import { Injectable, Logger } from '@nestjs/common';
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

    constructor(
    @InjectRepository(AudioFeatures) private readonly audioFeatures: Repository<AudioFeatures>,
    @InjectRepository(SpotifyReleaseEntity) private readonly spotifyReleaseEntity: Repository<SpotifyReleaseEntity>,
    @InjectRepository(SpotifyTrackEntity) private readonly spotifyTrackEntity: Repository<SpotifyTrackEntity>
    ) {}


    async scatterDanceabilityLoudness() {
        const danceabilityLoudness = await this.audioFeatures.find({
            select: ['danceability', 'loudness'],
        });
    
        const transformedData = danceabilityLoudness.map(item => ({
            x: item.danceability,
            y: item.loudness,
        }));
    
        return {
            data: transformedData,
            description: "Correlation between loudness and danceability",
        };
    }
    
    async getAlbumTypeDistribution() {
        const albumTypeDistribution = await this.spotifyReleaseEntity
            .createQueryBuilder('sp_release')
            .select('sp_release.album_type, COUNT(sp_release.album_type) as count')
            .groupBy('sp_release.album_type')
            .getRawMany();
    
        const xList = albumTypeDistribution.map(item => item.album_type);
        const yList = albumTypeDistribution.map(item => item.count);
    
        return {
            x: xList,
            y: {y: yList, "description": "percentage of album type"}
        };
    }
    
    async totalTracksByArtistName() {
        const totalTracksByArtist = await this.spotifyReleaseEntity
            .createQueryBuilder('sp_release')
            .select('sp_artist.artist_name, SUM(sp_release.total_tracks) as total')
            .innerJoin('sp_artist_release', 'artist_release', 'artist_release.release_id = sp_release.release_id')
            .innerJoin('sp_artist', 'sp_artist', 'sp_artist.artist_id = artist_release.artist_id') // Join the sp_artist table
            .groupBy('sp_artist.artist_name')
            .getRawMany();
        
        const xList = totalTracksByArtist.map(item => item.artist_name);
        const yList = totalTracksByArtist.map(item => item.total);
    
        return {
            x: xList,
            y: {y: yList, "description": "total tracks of the artist"}
        };
    }

    async numberOfTracksOverTime() {

        const tracksOverTime = await this.spotifyTrackEntity
        .createQueryBuilder('sp_track')
        .select('sp_track.updated_on, COUNT(sp_track.track_id) as count')
        .groupBy('sp_track.updated_on')
        .getRawMany();

        const xList = tracksOverTime.map(item => item.updated_on);
        const yList = tracksOverTime.map(item => item.count);
    
        return {
            x: xList,
            y: {y: yList, "description": "tracks over time"}
        };
    }

    



}
