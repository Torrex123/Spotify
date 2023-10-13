import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'sp_artist_track'})
export class SpotifyArtistTrackEntity {

    @PrimaryGeneratedColumn('uuid', {name: 'track_id'})
    trackId: string

    @Column({name: 'artist_id'})
    artistId: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
