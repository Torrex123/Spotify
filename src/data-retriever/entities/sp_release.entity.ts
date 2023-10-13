import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'sp_release'})
export class SpotifyReleaseEntity {

    @PrimaryGeneratedColumn('uuid', {name: 'release_id'})
    releaseId: string

    @Column({name: 'release_title'})
    releaseTitle: string

    @Column({name: 'release_date'})
    releaseDate: Date

    @Column()
    upc: number

    @Column()
    popularity: number

    @Column({name: 'total_tracks'})
    totalTracks: number

    @Column({name: 'album_type'})
    albumType: string

    @Column({name: 'release_img'})
    releaseImg: string

    @Column({name: 'label_name'})
    labelName: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
