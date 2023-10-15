import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SpotifyReleaseEntity } from "./sp_release.entity";
import { SpotifyArtistEntity } from "./sp_artist.entity";

@Entity({name: 'sp_artist_release'})
export class SpotifyArtistRelease {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => SpotifyReleaseEntity, release => release.releaseId)
    @JoinColumn()
    @Column({name: 'release_id', type: 'varchar', length: 255})
    releaseId: string

    @OneToOne(() => SpotifyArtistEntity, artist => artist.artistId)
    @JoinColumn()
    @Column({name: 'artist_id', type: 'varchar', length: 255})
    artistId: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
