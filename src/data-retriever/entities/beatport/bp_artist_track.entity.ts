import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_artist_track'})
export class BeatportArtistTrack {

    @PrimaryGeneratedColumn({name: 'artist_id'})
    releaseId: number

    @Column({name: 'track_id'})
    trackId: number

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date

    @Column({name: 'is_remixer'})
    isRemixer: boolean
}
