import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'audio_features'})
export class AudioFeatures{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'isrc', type: 'varchar' }) // Cambiar a varchar
    isrc: string;

    @Column({name: 'acousticness', type: 'float'})
    acousticness: number

    @Column({name: 'danceability', type: 'float'})
    danceability: number

    @Column({name: 'duration_ms'})
    duration_ms: number

    @Column({name: 'energy', type: 'float'})
    energy: number

    @Column({name: 'key'})
    key: number

    @Column({name: 'liveness', type: 'float'})
    liveness: number

    @Column({name: 'loudness', type: 'float'})
    loudness: number

    @Column({name: 'mode'})
    mode: number

}
