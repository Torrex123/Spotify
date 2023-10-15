import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697393379042 implements MigrationInterface {
    name = 'Init1697393379042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "audio_features" ("id" SERIAL NOT NULL, "isrc" character varying NOT NULL, "acousticness" double precision NOT NULL, "danceability" double precision NOT NULL, "duration_ms" integer NOT NULL, "energy" double precision NOT NULL, "key" integer NOT NULL, "liveness" double precision NOT NULL, "loudness" double precision NOT NULL, "mode" integer NOT NULL, CONSTRAINT "PK_5cea7a1dd2255ca0c8c43c8056c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sp_release" ("id" SERIAL NOT NULL, "release_id" character varying(255) NOT NULL, "release_title" character varying(255) NOT NULL, "release_date" character varying, "upc" bigint NOT NULL, "popularity" integer NOT NULL, "total_tracks" integer NOT NULL, "album_type" character varying(255) NOT NULL, "release_img" character varying(255) NOT NULL, "label_name" character varying(255) NOT NULL, "updated_on" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_9fb71f3629bc9c8759f0ea89c3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sp_artist" ("artist_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artist_name" character varying NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3dd30daea3e4dd803df8d118351" PRIMARY KEY ("artist_id"))`);
        await queryRunner.query(`CREATE TABLE "sp_artist_release" ("release_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artist_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "release_id_id" integer, "artist_id_artist_id" uuid, CONSTRAINT "REL_557315462a9455f0f1a9e4057a" UNIQUE ("release_id_id"), CONSTRAINT "REL_73188b515dfaf92430e641c635" UNIQUE ("artist_id_artist_id"), CONSTRAINT "PK_1a71343f3c00544ab523736e896" PRIMARY KEY ("release_id"))`);
        await queryRunner.query(`CREATE TABLE "sp_track" ("track_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "track_title" character varying NOT NULL, "duration_ms" bigint NOT NULL, "isrc" character varying NOT NULL, "track_number" integer NOT NULL, "release_id" character varying NOT NULL, "explicit" boolean NOT NULL, "disc_number" integer NOT NULL, "preview_url" character varying NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "release_id_id" integer, CONSTRAINT "REL_ee26c0a0f39b15eb2db4a75ad5" UNIQUE ("release_id_id"), CONSTRAINT "PK_af1d7a61b5a74cbdc42c2ff1320" PRIMARY KEY ("track_id"))`);
        await queryRunner.query(`CREATE TABLE "sp_artist_track" ("track_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artist_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "track_id_track_id" uuid, "artist_id_artist_id" uuid, CONSTRAINT "REL_d0a6ec910f3edd9a3bd1121334" UNIQUE ("track_id_track_id"), CONSTRAINT "REL_1d8e051797e2b079506be6eae2" UNIQUE ("artist_id_artist_id"), CONSTRAINT "PK_7245123eaf37715c23d50c4a15a" PRIMARY KEY ("track_id"))`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD CONSTRAINT "FK_557315462a9455f0f1a9e4057aa" FOREIGN KEY ("release_id_id") REFERENCES "sp_release"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD CONSTRAINT "FK_73188b515dfaf92430e641c635e" FOREIGN KEY ("artist_id_artist_id") REFERENCES "sp_artist"("artist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_track" ADD CONSTRAINT "FK_ee26c0a0f39b15eb2db4a75ad5d" FOREIGN KEY ("release_id_id") REFERENCES "sp_release"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD CONSTRAINT "FK_d0a6ec910f3edd9a3bd1121334b" FOREIGN KEY ("track_id_track_id") REFERENCES "sp_track"("track_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD CONSTRAINT "FK_1d8e051797e2b079506be6eae2f" FOREIGN KEY ("artist_id_artist_id") REFERENCES "sp_artist"("artist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP CONSTRAINT "FK_1d8e051797e2b079506be6eae2f"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP CONSTRAINT "FK_d0a6ec910f3edd9a3bd1121334b"`);
        await queryRunner.query(`ALTER TABLE "sp_track" DROP CONSTRAINT "FK_ee26c0a0f39b15eb2db4a75ad5d"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP CONSTRAINT "FK_73188b515dfaf92430e641c635e"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP CONSTRAINT "FK_557315462a9455f0f1a9e4057aa"`);
        await queryRunner.query(`DROP TABLE "sp_artist_track"`);
        await queryRunner.query(`DROP TABLE "sp_track"`);
        await queryRunner.query(`DROP TABLE "sp_artist_release"`);
        await queryRunner.query(`DROP TABLE "sp_artist"`);
        await queryRunner.query(`DROP TABLE "sp_release"`);
        await queryRunner.query(`DROP TABLE "audio_features"`);
    }

}
