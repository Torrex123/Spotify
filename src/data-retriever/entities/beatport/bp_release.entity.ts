import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, UpdateDateColumn } from "typeorm";
import { BeatportLabel } from "./bp_label.entity";

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

    @OneToOne(() => BeatportLabel, label => label.labelId, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'label_id' })
    label: BeatportLabel;

}
