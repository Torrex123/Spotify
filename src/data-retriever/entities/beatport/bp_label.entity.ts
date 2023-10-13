import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'bp_label'})
export class BeatportLabel{

    @PrimaryGeneratedColumn({name: 'label_id'})
    labelId: number

    @Column({name: 'label_name'})
    labelName: string

    @Column({name: 'label_url'})
    labelURL: string

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date
}
