import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BeatportGenre } from "./bp_genre.entity";
import { BeatportSubgenre } from "./bp_subgenre.entity";
import { BeatportRelease } from "./bp_release.entity";

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

    @OneToOne(() => BeatportGenre, genre => genre.genreId, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'genre_id' })
    genre: BeatportGenre;

    @OneToOne(() => BeatportSubgenre, subgenre => subgenre.subgenreId, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'subgenre_id' })
    subgenre: BeatportSubgenre;

    @OneToOne(() => BeatportRelease, release => release.labelId, {
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'release_id' })
    release: BeatportRelease;

}
