import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697336415644 implements MigrationInterface {
    name = 'Init1697336415644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "audio_features" ("id" SERIAL NOT NULL, "isrc" character varying NOT NULL, "acousticness" double precision NOT NULL, "danceability" double precision NOT NULL, "duration_ms" integer NOT NULL, "energy" double precision NOT NULL, "key" integer NOT NULL, "liveness" double precision NOT NULL, "loudness" double precision NOT NULL, "mode" integer NOT NULL, CONSTRAINT "PK_5cea7a1dd2255ca0c8c43c8056c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sp_release" ("release_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "release_title" character varying NOT NULL, "release_date" TIMESTAMP NOT NULL, "upc" integer NOT NULL, "popularity" integer NOT NULL, "total_tracks" integer NOT NULL, "album_type" character varying NOT NULL, "release_img" character varying NOT NULL, "label_name" character varying NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8dfd47729c7df8a1663655a5f87" PRIMARY KEY ("release_id"))`);
        await queryRunner.query(`CREATE TABLE "sp_artist" ("artist_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artist_name" character varying NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3dd30daea3e4dd803df8d118351" PRIMARY KEY ("artist_id"))`);
        await queryRunner.query(`CREATE TABLE "sp_artist_release" ("release_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artist_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "release_id_release_id" uuid, "artist_id_artist_id" uuid, CONSTRAINT "REL_3c93ce54ab2a941f4ef15100c7" UNIQUE ("release_id_release_id"), CONSTRAINT "REL_73188b515dfaf92430e641c635" UNIQUE ("artist_id_artist_id"), CONSTRAINT "PK_1a71343f3c00544ab523736e896" PRIMARY KEY ("release_id"))`);
        await queryRunner.query(`CREATE TABLE "sp_track" ("track_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "track_title" character varying NOT NULL, "duration_ms" integer NOT NULL, "isrc" character varying NOT NULL, "track_number" integer NOT NULL, "release_id" character varying NOT NULL, "explicit" boolean NOT NULL, "disc_number" integer NOT NULL, "preview_url" character varying NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "release_id_release_id" uuid, CONSTRAINT "REL_d442b9b067021a3c1ce46e9f9a" UNIQUE ("release_id_release_id"), CONSTRAINT "PK_af1d7a61b5a74cbdc42c2ff1320" PRIMARY KEY ("track_id"))`);
        await queryRunner.query(`CREATE TABLE "sp_artist_track" ("track_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artist_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "track_id_track_id" uuid, "artist_id_artist_id" uuid, CONSTRAINT "REL_d0a6ec910f3edd9a3bd1121334" UNIQUE ("track_id_track_id"), CONSTRAINT "REL_1d8e051797e2b079506be6eae2" UNIQUE ("artist_id_artist_id"), CONSTRAINT "PK_7245123eaf37715c23d50c4a15a" PRIMARY KEY ("track_id"))`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD CONSTRAINT "FK_3c93ce54ab2a941f4ef15100c76" FOREIGN KEY ("release_id_release_id") REFERENCES "sp_release"("release_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD CONSTRAINT "FK_73188b515dfaf92430e641c635e" FOREIGN KEY ("artist_id_artist_id") REFERENCES "sp_artist"("artist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_track" ADD CONSTRAINT "FK_d442b9b067021a3c1ce46e9f9aa" FOREIGN KEY ("release_id_release_id") REFERENCES "sp_release"("release_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD CONSTRAINT "FK_d0a6ec910f3edd9a3bd1121334b" FOREIGN KEY ("track_id_track_id") REFERENCES "sp_track"("track_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD CONSTRAINT "FK_1d8e051797e2b079506be6eae2f" FOREIGN KEY ("artist_id_artist_id") REFERENCES "sp_artist"("artist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP CONSTRAINT "FK_1d8e051797e2b079506be6eae2f"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP CONSTRAINT "FK_d0a6ec910f3edd9a3bd1121334b"`);
        await queryRunner.query(`ALTER TABLE "sp_track" DROP CONSTRAINT "FK_d442b9b067021a3c1ce46e9f9aa"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP CONSTRAINT "FK_73188b515dfaf92430e641c635e"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP CONSTRAINT "FK_3c93ce54ab2a941f4ef15100c76"`);
        await queryRunner.query(`DROP TABLE "sp_artist_track"`);
        await queryRunner.query(`DROP TABLE "sp_track"`);
        await queryRunner.query(`DROP TABLE "sp_artist_release"`);
        await queryRunner.query(`DROP TABLE "sp_artist"`);
        await queryRunner.query(`DROP TABLE "sp_release"`);
        await queryRunner.query(`DROP TABLE "audio_features"`);
    }

}
