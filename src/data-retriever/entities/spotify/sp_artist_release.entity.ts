import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'sp_artist_release'})
export class SpotifyArtistRelease {

    @PrimaryGeneratedColumn('uuid')
    releaseId: string

    @Column({name: 'artist_id'})
    artistId: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
