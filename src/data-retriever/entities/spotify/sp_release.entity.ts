import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'sp_release'})
export class SpotifyReleaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'release_id', type: 'varchar', length: 255})
    releaseId: string

    @Column({name: 'release_title', type: 'varchar', length: 255})
    releaseTitle: string

    @Column({name: 'release_date', nullable: true})
    releaseDate: string

    @Column({type: 'bigint'})
    upc: number

    @Column({name: 'popularity'})
    popularity: number

    @Column({name: 'total_tracks'})
    totalTracks: number

    @Column({name: 'album_type', type: 'varchar', length: 255})
    albumType: string

    @Column({name: 'release_img', type: 'varchar', length: 255})
    releaseImg: string

    @Column({name: 'label_name', type: 'varchar', length: 255})
    labelName: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on',
        nullable: true
    })
    updatedOn: Date
}
