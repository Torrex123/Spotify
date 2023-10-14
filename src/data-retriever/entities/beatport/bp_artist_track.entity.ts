import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BeatportRelease } from "./bp_release.entity";
import { BeatportTrack } from "./bp_track.entity";

@Entity({name: 'bp_artist_track'})
export class BeatportArtistTrack {

    @PrimaryGeneratedColumn({name: 'artist_id'})
    @OneToOne(() => BeatportRelease, release => release.releaseId)
    @JoinColumn()
    artistId: number

    @Column({name: 'track_id'})
    @OneToOne(() => BeatportTrack, track => track.trackId)
    @JoinColumn()
    trackId: number

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_on'
    })
    updatedOn: Date

    @Column({name: 'is_remixer'})
    isRemixer: boolean
}
