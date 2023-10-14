import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity({name: 'bp_artist_media'})
export class BeatportArtistMedia {

    @PrimaryGeneratedColumn({name: 'artist_id'})
    artist_id: number

    @Column({name: 'artist_img_id'})
    artistImgId: number

    @Column('uuid', {name: 'artist_img_uuid'})
    artistImgUUID: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
