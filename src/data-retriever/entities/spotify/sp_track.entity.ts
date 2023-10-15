import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SpotifyReleaseEntity } from "./sp_release.entity";

@Entity({name: 'sp_track'})
export class SpotifyTrackEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'track_id', type: 'varchar', length: 255})
    trackId: string

    @Column({name: 'track_title', type: 'varchar', length: 500})
    trackTitle: string

    @Column({name: 'duration_ms', type: 'bigint'})
    durationMs: number

    @Column({type: 'varchar', length: 255})
    isrc: string

    @Column({name: 'track_number'})
    trackNumber: number

    @Column({name: 'release_id', type: 'varchar', length: 255})
    @OneToOne(() => SpotifyReleaseEntity, release => release.releaseId)
    @JoinColumn()
    releaseId: string

    @Column()
    explicit: boolean

    @Column({name: 'disc_number'})
    discNumber: number

    @Column({name: 'preview_url', type: 'varchar', length: 500})
    previewUrl: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date




}
