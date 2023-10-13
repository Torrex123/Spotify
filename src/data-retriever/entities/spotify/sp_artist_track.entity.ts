import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SpotifyTrackEntity } from "./sp_track.entity";
import { SpotifyArtistEntity } from "./sp_artist.entity";

@Entity({name: 'sp_artist_track'})
export class SpotifyArtistTrackEntity {

    @PrimaryGeneratedColumn('uuid', {name: 'track_id'})
    @OneToOne(() => SpotifyTrackEntity, track => track.trackId)
    @JoinColumn()
    trackId: string

    @PrimaryGeneratedColumn('uuid', {name: 'artist_id'})
    @Column({name: 'artist_id'})
    @OneToOne(() => SpotifyArtistEntity, artist => artist.artistId)
    @JoinColumn()
    artistId: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
