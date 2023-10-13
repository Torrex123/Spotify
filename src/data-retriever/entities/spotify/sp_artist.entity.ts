import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'sp_artist'})
export class SpotifyArtistEntity {

    @PrimaryGeneratedColumn('uuid', {name: 'artist_id'})
    artistId: string

    @Column({name: 'artist_name'})
    artistName: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
