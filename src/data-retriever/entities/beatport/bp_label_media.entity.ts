import {Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_label_media'})
export class BeatportLabelMedia{

    @PrimaryGeneratedColumn({name: 'label_id'})
    labelId: number

    @PrimaryGeneratedColumn({name: 'label_img_id}'})
    labelImgId: number

    @PrimaryGeneratedColumn('uuid',{name: 'label_img_uuid}'})
    labelImgUuid: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}

