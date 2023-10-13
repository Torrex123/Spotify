import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_release'})
export class BeatportRelease{

    @PrimaryGeneratedColumn({name: 'release_id'})
    releaseId: number

    @Column({name: 'release_title'})
    releaseTitle: string

    @Column({name: 'release_date'})
    releaseDate: Date

    @Column({name: 'release_url'})
    releaseUrl: string

    @Column({name: 'label_id'})
    labelId: number

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
