import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_artist'})
export class BeatportArtist {

    @PrimaryGeneratedColumn({name: 'artist_id'})
    releaseId: number

    @Column({name: 'artist_name'})
    artistId: string

    @Column({name: 'artist_url'})
    artistURL: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
