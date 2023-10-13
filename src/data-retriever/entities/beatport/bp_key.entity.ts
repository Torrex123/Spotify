import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'bp_key'})
export class BeatportKey {

    @PrimaryGeneratedColumn({name: 'key_id'})
    keyId: number

    @Column({name: 'key_letter'})
    keyLetter: string

    @Column({name: 'key_name'})
    keyName: number

    @Column({name: 'camelot_num'})
    camelotNum: number

    @Column({name: 'camelot_letter'})
    camelotLetter: string

    @Column({name: 'is_sharp'})
    isSharp: boolean

    @Column({name: 'is_flat'})
    is_flat: boolean
    
    @PrimaryGeneratedColumn({name: 'chord_id'})
    chordID: number

    @Column({name: 'chord_name'})
    chordName: string

}
