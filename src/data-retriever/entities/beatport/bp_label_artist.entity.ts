import {Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_label_artist'})
export class BeatportLabelArtist{

    @PrimaryGeneratedColumn({name: 'label_id'})
    labelId: number

    @PrimaryGeneratedColumn({name: 'artist_id}'})
    artistId: number

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}

