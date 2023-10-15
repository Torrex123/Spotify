import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SpotifyTrackEntity } from "./sp_track.entity";
import { SpotifyArtistEntity } from "./sp_artist.entity";

@Entity({name: 'sp_artist_track'})
export class SpotifyArtistTrackEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'track_id', type: 'varchar', length: 255})
    @OneToOne(() => SpotifyTrackEntity, track => track.trackId)
    @JoinColumn()
    trackId: string

    @Column({name: 'artist_id', type: 'varchar', length: 255})
    @OneToOne(() => SpotifyArtistEntity, artist => artist.artistId)
    @JoinColumn()
    artistId: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
