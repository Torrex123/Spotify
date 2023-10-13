import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BeatportLabel } from "./bp_label.entity";
import { BeatportArtist } from "./bp_artist.entity";

@Entity({name: 'bp_label_artist'})
export class BeatportLabelArtist{

    @PrimaryGeneratedColumn({name: 'label_id'})
    @OneToOne(() => BeatportLabel, label => label.labelId)
    @JoinColumn()
    labelId: number

    @PrimaryGeneratedColumn({name: 'artist_id}'})
    @OneToOne(() => BeatportArtist, artist => artist.artistId)
    @JoinColumn()
    artistId: number

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}

