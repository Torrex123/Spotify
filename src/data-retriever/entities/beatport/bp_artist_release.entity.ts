import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BeatportArtist } from "./bp_artist.entity";
import { BeatportRelease } from "./bp_release.entity";

@Entity({name: 'bp_artist_release'})
export class BeatportArtistRelease {

    @PrimaryGeneratedColumn({name: 'artist_id'})
    @OneToOne(() => BeatportArtist, artist => artist.artistId)
    @JoinColumn()
    artistId: number

    @PrimaryGeneratedColumn({name: 'release_id'})
    @OneToOne(() => BeatportRelease, release => release.releaseId)
    @JoinColumn()
    releaseId: number

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
