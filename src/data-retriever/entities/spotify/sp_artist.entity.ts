import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'sp_artist'})
export class SpotifyArtistEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'artist_id', type: 'varchar', length: 255})
    artistId: string

    @Column({name: 'artist_name', type: 'varchar', length: 255})
    artistName: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
