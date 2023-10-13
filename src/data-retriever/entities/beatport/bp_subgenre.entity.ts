import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

}
