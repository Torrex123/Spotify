import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_genre'})
export class BeatportGenre {

    @PrimaryGeneratedColumn({name: 'genre_id'})
    genreId: number

    @Column({name: 'genre_name'})
    genreName: string

    @Column({name: 'song_count'})
    songCount: number

    @Column({name: 'genre_url'})
    genreURL: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
