import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioFeatures } from './entities/audio/audio_features.entity';
import { BeatportArtist } from './entities/beatport/bp_artist.entity';
import { BeatportArtistMedia } from './entities/beatport/bp_artist_media.entity'; 
import { BeatportArtistRelease } from './entities/beatport/bp_artist_release.entity';
import { BeatportArtistTrack } from './entities/beatport/bp_artist_track.entity';
import { BeatportGenre } from './entities/beatport/bp_genre.entity';
import { BeatportKey } from './entities/beatport/bp_key.entity';
import { BeatportLabel } from './entities/beatport/bp_label.entity';
import { BeatportLabelArtist } from './entities/beatport/bp_label_artist.entity'; 


import { Repository } from 'typeorm';
import * as fs from 'fs';
import { parse } from 'csv-parse';

@Injectable()
export class DataRetrieverService {

    constructor(@InjectRepository(AudioFeatures) private readonly audioRepository: Repository<AudioFeatures>,
                @InjectRepository(BeatportGenre) private readonly beatportGenreRepository: Repository<BeatportGenre>,
                @InjectRepository(BeatportArtist) private readonly beatportArtistRepository: Repository<BeatportArtist>,
                @InjectRepository(BeatportArtistMedia) private readonly beatportArtistMediaRepository: Repository<BeatportArtistMedia>,
                @InjectRepository(BeatportArtistRelease) private readonly beatportArtistReleaseRepository: Repository<BeatportArtistMedia>,
                @InjectRepository(BeatportArtistTrack) private readonly beatportArtistTrackRepository: Repository<BeatportArtistTrack>,
                @InjectRepository(BeatportKey) private readonly beatportKeyRepository: Repository<BeatportKey>,
                @InjectRepository(BeatportLabel) private readonly beatportLabelRepository: Repository<BeatportLabel>,
                @InjectRepository(BeatportLabelArtist) private readonly beatportLabelArtistRepository: Repository<BeatportLabelArtist>) {}

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

            csvData.forEach((data) => {

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

            });
        });
    }

    async seedBeatportArtists(){
        const csvFilePath = 'csv_files/bp_artist.csv'; 
        const csvData = [];

        fs.createReadStream(csvFilePath)
            .pipe(parse({ delimiter: ',', columns: true }))
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', async () => {
                for (const item of csvData) {
                    const beatportArtist = new BeatportArtist();
                    beatportArtist.artistId = item.artist_id; 
                    beatportArtist.artistName = item.artist_name;
                    beatportArtist.artistURL = item.artist_url;
                    beatportArtist.updatedOn = item.updated_on;

                    await this.beatportArtistRepository.save(beatportArtist);
                }
            })
    }


    async seedBeatportArtistsMedia(){
        const csvFilePath = 'csv_files/bp_artist_media.csv'; 
        const csvData = [];

        fs.createReadStream(csvFilePath)
            .pipe(parse({ delimiter: ',', columns: true }))
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', async () => {
                for (const item of csvData) {
                    const beatportArtistMedia = new BeatportArtistMedia();
                    beatportArtistMedia.artist_id = item.artist_id;
                    beatportArtistMedia.artistImgId = item.artist_img_id;
                    beatportArtistMedia.artistImgUUID = item.artist_img_uuid;
                    beatportArtistMedia.updatedOn = item.updated_on;
                    
                    await this.beatportArtistReleaseRepository.save(beatportArtistMedia);
                }
            })
    }


    async seedBeatportArtistsRelease(){
        const csvFilePath = 'csv_files/bp_artist_release.csv'; 
        const csvData = [];

        fs.createReadStream(csvFilePath)
            .pipe(parse({ delimiter: ',', columns: true }))
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', async () => {
                for (const item of csvData) {
                    const beatportArtistRelease = new BeatportArtistRelease();
                    beatportArtistRelease.artistId = item.artist_id;
                    beatportArtistRelease.releaseId = item.release_id;
                    beatportArtistRelease.updatedOn = item.updated_on;
      
                    await this.beatportArtistMediaRepository.save(beatportArtistRelease);
                }
            })
    }


    async seedBeatportArtistsTrack(){
        const csvFilePath = 'csv_files/bp_artist_track.csv'; 
        const csvData = [];

        fs.createReadStream(csvFilePath)
            .pipe(parse({ delimiter: ',', columns: true }))
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', async () => {
                for (const item of csvData) {
                    const beatportArtistTrack = new BeatportArtistTrack();
                    beatportArtistTrack.artistId = item.artist_id;
                    beatportArtistTrack.trackId = item.track_id;
                    beatportArtistTrack.updatedOn = item.updated_on;
                    beatportArtistTrack.isRemixer = item.is_remixer;
      
                    await this.beatportArtistTrackRepository.save(beatportArtistTrack);
                }
            })
    }


    async seedBeatportGenre(){
        const results = [];
        const csvFilePath = 'csv_files/bp_genre.csv';
        const csvData = [];

        console.log(csvFilePath);

        fs.createReadStream(csvFilePath)
            .pipe(parse({ delimiter: ',', columns: true }))
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', async () => {
                for (const item of csvData) {
                    const beatportGenre = new BeatportGenre();
                    beatportGenre.genreName = item.genre_name;
                    beatportGenre.songCount = item.song_count;
                    beatportGenre.genreURL = item.genre_url;

                    await this.beatportGenreRepository.save(beatportGenre);
                }
            })
    }

    async seedBeatportKey(){
        const results = [];
        const csvFilePath = 'csv_files/bp_key.csv';
        const csvData = [];

        console.log(csvFilePath);

        fs.createReadStream(csvFilePath)
            .pipe(parse({ delimiter: ',', columns: true }))
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', async () => {
                for (const item of csvData) {
                    const beatportKey = new BeatportKey();
                    beatportKey.keyId = item.key_id;
                    beatportKey.keyLetter = item.key_letter;
                    beatportKey.keyName = item.key_name;
                    beatportKey.camelotNum = item.camelot_num;
                    beatportKey.camelotLetter = item.camelot_letter;
                    beatportKey.isSharp = item.is_sharp;
                    beatportKey.isFlat = item.is_flat;
                    beatportKey.chordID = item.chord_id;
                    beatportKey.chordName = item.chord_name;
           
                    await this.beatportKeyRepository.save(beatportKey);
                }
            })
    }


    async seedBeatportLabelArtist(){
        const results = [];
        const csvFilePath = 'csv_files/bp_label_artist.csv';
        const csvData = [];

        console.log(csvFilePath);

        fs.createReadStream(csvFilePath)
            .pipe(parse({ delimiter: ',', columns: true }))
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', async () => {
                for (const item of csvData) {
                    const beatportLabelArtist = new BeatportLabelArtist();
                    beatportLabelArtist.labelId = item.label_id;
                    beatportLabelArtist.artistId = item.artist_id;
                    beatportLabelArtist.updatedOn = item.updated_on;

                    await this.beatportLabelArtistRepository.save(beatportLabelArtist);
                }
            })
    }


    async retrieveAudioFeatures() {
        const data = await this.audioRepository.find()
        return data
    }

    async retrieveBeatportGenre() {
        const data = await this.beatportGenreRepository.find()
        return data
    }

    async retrieveBeatportArtist() {
        const data = await this.beatportArtistRepository.find()
        return data
    }

}
