import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_track'})
export class BeatportTrack{

    @PrimaryGeneratedColumn({name: 'track_id'})
    trackId: number

    @Column({name: 'title'})
    title: string

    @Column({name: 'mix'})
    mix: string

    @Column({name: 'is_remixed'})
    isRemixed: boolean

    @Column({name: 'release_date'})
    releaseDate: Date

    @PrimaryGeneratedColumn({name: 'genre_id'})
    genreId: number

    @PrimaryGeneratedColumn({name: 'subgenre_id'})
    subgenreId: number

    @Column({name: 'track_url'})
    trackURL: string

    @Column({name: 'bpm'})
    bpm: number

    @Column({name: 'duration'})
    duration: string

}
