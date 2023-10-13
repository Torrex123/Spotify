import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_release_media'})
export class BeatportReleaseMedia{

    @PrimaryGeneratedColumn({name: 'release_id'})
    releaseId: number

    @PrimaryGeneratedColumn({name: 'release_img_id'})
    releaseImgId: number

    @PrimaryGeneratedColumn('uuid', {name: 'release_img_uuid'})
    releaseImgUuid: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
