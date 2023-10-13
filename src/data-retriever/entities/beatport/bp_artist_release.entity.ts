import {Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_artist_release'})
export class BeatportArtistRelease {

    @PrimaryGeneratedColumn({name: 'artist_id'})
    artistId: number

    @PrimaryGeneratedColumn({name: 'release_id'})
    releaseId: number

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
