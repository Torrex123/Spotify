import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import{BeatportGenre} from "./bp_genre.entity" 

@Entity({name: 'bp_subgenre'})
export class BeatportSubgenre{

    @PrimaryGeneratedColumn({name: 'subgenre_id'})
    subgenreId: number

    @Column({name: 'subgenre_name'})
    subgenrename: string

    @Column({name: 'song_count'})
    songCount: number

    @PrimaryGeneratedColumn({name: 'genre_id'})
    genreId: number

    @Column({name: 'subgenre_url'})
    subgenreURl: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date

    @Column({name: 'genre_url'})
    genreURl: string

    @ManyToOne(() => BeatportGenre, genre => genre.genreId, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'genre_id' })
    genre: BeatportGenre;

}
