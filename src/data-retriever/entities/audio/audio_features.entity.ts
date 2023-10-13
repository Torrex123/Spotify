import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'audio_features'})
export class AudioFeatures{

    @PrimaryGeneratedColumn('uuid', {name: 'isrc'})
    isrc: string

    @Column({name: 'acousticness'})
    acousticness: number

    @Column({name: 'danceability'})
    danceability: number

    @Column({name: 'duration_ms'})
    duration_ms: number

    @Column({name: 'energy'})
    energy: number

    @Column({name: 'key'})
    key: number

    @Column({name: 'liveness'})
    liveness: number

    @Column({name: 'loudness'})
    loudness: number

    @Column({name: 'mode'})
    mode: number

}
