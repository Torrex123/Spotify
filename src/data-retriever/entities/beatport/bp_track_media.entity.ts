import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_track_media'})
export class BeatportTrackMedia{

    @PrimaryGeneratedColumn({name: 'track_id'})
    trackId: number

    @PrimaryGeneratedColumn({name: 'wave_img_id'})
    waveImgId: number

    @PrimaryGeneratedColumn('uuid', {name: 'wave_img_uuid'})
    waveImgUuid: string

    @PrimaryGeneratedColumn('uuid', {name: 'sample_uuid'})
    sampleUuid: string

    @Column({name: 'sample_start'})
    sampleStart: number

    @Column({name: 'sample_end'})
    sampleEnd: number

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
