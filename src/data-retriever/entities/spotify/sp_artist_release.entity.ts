import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SpotifyReleaseEntity } from "./sp_release.entity";
import { SpotifyArtistEntity } from "./sp_artist.entity";

@Entity({name: 'sp_artist_release'})
export class SpotifyArtistRelease {

    @PrimaryGeneratedColumn('uuid', {name: 'release_id'})
    @OneToOne(() => SpotifyReleaseEntity, release => release.releaseId)
    @JoinColumn()
    releaseId: string

    @PrimaryGeneratedColumn('uuid', {name: 'artist_id'})
    @OneToOne(() => SpotifyArtistEntity, artist => artist.artistId)
    @JoinColumn()
    @Column({name: 'artist_id'})
    artistId: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
