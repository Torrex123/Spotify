import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'sp_track'})
export class SpotifyTrackEntity {

    @PrimaryGeneratedColumn('uuid', {name: 'track_id'})
    trackId: string

    @Column({name: 'track_title'})
    trackTitle: string

    @Column({name: 'duration_ms'})
    durationMs: number

    @Column()
    isrc: string

    @Column({name: 'track_number'})
    trackNumber: number

    @Column({name: 'release_id'})
    releaseId: string

    @Column()
    explicit: boolean

    @Column({name: 'disc_number'})
    discNumber: number

    @Column({name: 'preview_url'})
    previewUrl: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
