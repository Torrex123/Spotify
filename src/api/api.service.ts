import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { DataRetrieverService } from 'src/data-retriever/data-retriever.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { AudioFeatures } from 'src/data-retriever/entities/audio/audio_features.entity';
import { SpotifyArtistRelease } from '../data-retriever/entities/spotify/sp_artist_release.entity';
import { SpotifyArtistTrackEntity } from '../data-retriever/entities/spotify/sp_artist_track.entity';
import { SpotifyArtistEntity } from '../data-retriever/entities/spotify/sp_artist.entity';
import { SpotifyReleaseEntity } from '../data-retriever/entities/spotify/sp_release.entity';
import { SpotifyTrackEntity } from '../data-retriever/entities/spotify/sp_track.entity';
import { parse } from 'path';


@Injectable()
export class ApiService {

    constructor(
    @InjectRepository(AudioFeatures) private readonly audioFeatures: Repository<AudioFeatures>,
    @InjectRepository(SpotifyReleaseEntity) private readonly spotifyReleaseEntity: Repository<SpotifyReleaseEntity>,
    @InjectRepository(SpotifyTrackEntity) private readonly spotifyTrackEntity: Repository<SpotifyTrackEntity>
    ) {}


    async scatterDanceabilityLoudness(artist?: string, top?: number, date?: string) {

        let query = this.audioFeatures.createQueryBuilder('audio_features')
        .select(['audio_features.danceability', 'audio_features.loudness'])
        .innerJoin('sp_track', 'track', 'audio_features.isrc = track.isrc')
        .innerJoin('sp_artist_track', 'artistTrack', 'artistTrack.track_id = track.track_id')
        .innerJoin('sp_artist', 'artist', 'artist.artist_id = artistTrack.artist_id')
        .innerJoin('sp_release', 'release', 'release.release_id = track.release_id')

        if (artist) {

            query.where('artist.artist_name = :artist', { artist });

        }

        if (top) {

            query.limit(top);
        }

        if (date) {
            const [startYear, endYear] = date.split('-');
    
            if (artist) {
                query.andWhere("EXTRACT(YEAR FROM TO_DATE(sp_release.release_date, 'YYYY-MM-DD')) BETWEEN :startYear AND :endYear", { startYear, endYear });
            } else {
                query.andWhere("EXTRACT(YEAR FROM TO_DATE(sp_release.release_date, 'YYYY-MM-DD')) BETWEEN :startYear AND :endYear", { startYear, endYear });
            }
        }
        
        const danceabilityLoudness = await query.getRawMany();

        const transformedData = danceabilityLoudness.map(item => ({
            x: item.audio_features_danceability,
            y: item.audio_features_loudness,
        }));

        return {
            data: transformedData,
            description: "Correlation between loudness and danceability",
        };
    }

    async getAlbumTypeDistribution(artist?: string, top?: number, date?: string) {

        console.log(artist, top, date);

        let query =  this.spotifyReleaseEntity.createQueryBuilder('sp_release')
            .select('sp_release.album_type, COUNT(sp_release.album_type) as count')
            .groupBy('sp_release.album_type');

        if (artist) {
            query =  query.innerJoin('sp_artist_release', 'artist_release', 'artist_release.release_id = sp_release.release_id')
                         .innerJoin('sp_artist', 'sp_artist', 'sp_artist.artist_id = artist_release.artist_id')
                         .andWhere('sp_artist.artist_name = :artist', { artist });
        }

        if (date) {
            const [startYear, endYear] = date.split('-');
    
            if (artist) {
                query.andWhere("EXTRACT(YEAR FROM TO_DATE(sp_release.release_date, 'YYYY-MM-DD')) BETWEEN :startYear AND :endYear", { startYear, endYear });
            } else {
                query.andWhere("EXTRACT(YEAR FROM TO_DATE(sp_release.release_date, 'YYYY-MM-DD')) BETWEEN :startYear AND :endYear", { startYear, endYear });
            }
        }

        if (top) {
            query =  query.limit(top);
        }

        const albumTypeDistribution = await query.getRawMany();

        console.log(albumTypeDistribution);

        const xList = albumTypeDistribution.map(item => item.album_type);
        const yList = albumTypeDistribution.map(item => item.count);

        return {
            x: xList,
            y: { y: yList, description: "percentage of album type" }
        };
    }

    async totalTracksByArtistName(artist?: string, top?: number, date?: string) {

        let query = this.spotifyReleaseEntity
            .createQueryBuilder('sp_release')
            .select('sp_artist.artist_name, SUM(sp_release.total_tracks) as total')
            .innerJoin('sp_artist_release', 'artist_release', 'artist_release.release_id = sp_release.release_id')
            .innerJoin('sp_artist', 'sp_artist', 'sp_artist.artist_id = artist_release.artist_id')
            .groupBy('sp_artist.artist_name')

        if (artist) {

            query.where('sp_artist.artist_name = :artist', { artist });

        }

        if (top) {

            query.limit(top);
        }

        if (date) {
            const [startYear, endYear] = date.split('-');
    
            if (artist) {
                query.andWhere("EXTRACT(YEAR FROM TO_DATE(sp_release.release_date, 'YYYY-MM-DD')) BETWEEN :startYear AND :endYear", { startYear, endYear });
            } else {
                query.andWhere("EXTRACT(YEAR FROM TO_DATE(sp_release.release_date, 'YYYY-MM-DD')) BETWEEN :startYear AND :endYear", { startYear, endYear });
            }
        }

        const totalTracksByArtist = await query.getRawMany();

        const xList = totalTracksByArtist.map(item => item.artist_name);
        const yList = totalTracksByArtist.map(item => item.total);

        return {
            x: xList,
            y: {y: yList, "description": "total tracks of the artist"}
        };
    }

    async numberOfTracksOverTime(artist?: string, top?: number, date?: string) {
        console.log(artist, top, date);
    
        let query = this.spotifyTrackEntity
            .createQueryBuilder('sp_track')
            .select('sp_release.release_date, COUNT(sp_track.track_id) as count')
            .innerJoin('sp_release', 'sp_release', 'sp_release.release_id = sp_track.release_id')
            .groupBy('sp_release.release_date');
    
        if (artist) {
            query = query.innerJoin('sp_artist_track', 'artist', 'artist.track_id = sp_track.track_id')
                         .innerJoin('sp_artist', 'sp_artist', 'sp_artist.artist_id = artist.artist_id')
                         .where('sp_artist.artist_name = :artist', { artist });
        }
    
        if (date) {
            const [startYear, endYear] = date.split('-');
    
            if (artist) {
                query.andWhere("EXTRACT(YEAR FROM TO_DATE(sp_release.release_date, 'YYYY-MM-DD')) BETWEEN :startYear AND :endYear", { startYear, endYear });
            } else {
                query.andWhere("EXTRACT(YEAR FROM TO_DATE(sp_release.release_date, 'YYYY-MM-DD')) BETWEEN :startYear AND :endYear", { startYear, endYear });
            }
        }
    
        if (top) {
            query = query.limit(top);
        }
    
        const tracksOverTime = await query.getRawMany();
    
        const xList = tracksOverTime.map(item => item.release_date);
        const yList = tracksOverTime.map(item => item.count);
    
        return {
            x: xList,
            y: { y: yList, description: "tracks over time" }
        };
    }
    

    async scatterInstrumentalnessEnergy(artist?: string, top?: number, date?: string) {

        let query = this.audioFeatures.createQueryBuilder('audio_features')
        .select(['audio_features.instrumentalness', 'audio_features.energy'])
        .innerJoin('sp_track', 'track', 'audio_features.isrc = track.isrc')
        .innerJoin('sp_artist_track', 'artistTrack', 'artistTrack.track_id = track.track_id')
        .innerJoin('sp_artist', 'artist', 'artist.artist_id = artistTrack.artist_id')
        .innerJoin('sp_release', 'release', 'release.release_id = track.release_id')

        if (artist) {

            query.where('artist.artist_name = :artist', { artist });

        }

        if (top) {

            query.limit(top);
        }

        if (date) {
            const [startYear, endYear] = date.split('-');
    
            if (artist) {
                query.andWhere("EXTRACT(YEAR FROM TO_DATE(sp_release.release_date, 'YYYY-MM-DD')) BETWEEN :startYear AND :endYear", { startYear, endYear });
            } else {
                query.andWhere("EXTRACT(YEAR FROM TO_DATE(sp_release.release_date, 'YYYY-MM-DD')) BETWEEN :startYear AND :endYear", { startYear, endYear });
            }
        }
        const instrumentalnessEnergy = await query.getRawMany();

        const transformedData = instrumentalnessEnergy.map(item => ({
            x: item.audio_features_instrumentalness,
            y: item.audio_features_energy,
        }));

        return {
            data: transformedData,
            description: "Correlation between instrumentalness and energy",
        };
    }

    async ArtistsByTrackNumber() {

        const top10ArtistsByTrackNumber = await this.spotifyReleaseEntity
        .createQueryBuilder('sp_release')
        .select('sp_artist.artist_name, SUM(sp_release.total_tracks) as total')
        .innerJoin('sp_artist_release', 'artist_release', 'artist_release.release_id = sp_release.release_id')
        .innerJoin('sp_artist', 'sp_artist', 'sp_artist.artist_id = artist_release.artist_id')
        .groupBy('sp_artist.artist_name')
        .orderBy('total', 'DESC')
        .limit(100)
        .getRawMany();

        const xList = top10ArtistsByTrackNumber.map(item => item.artist_name);
        const yList = top10ArtistsByTrackNumber.map(item => item.total);

        return {
            x: xList,
            y: {y: yList, "description": "top 100 artists by track number"}
        };

    }

}
