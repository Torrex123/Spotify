import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697403202997 implements MigrationInterface {
    name = 'Init1697403202997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "audio_features" ("id" SERIAL NOT NULL, "isrc" character varying NOT NULL, "acousticness" double precision NOT NULL, "danceability" double precision NOT NULL, "duration_ms" integer NOT NULL, "energy" double precision NOT NULL, "key" integer NOT NULL, "liveness" double precision NOT NULL, "instrumentalness" double precision NOT NULL, "loudness" double precision NOT NULL, "mode" integer NOT NULL, CONSTRAINT "PK_5cea7a1dd2255ca0c8c43c8056c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sp_release" ("id" SERIAL NOT NULL, "release_id" character varying(255) NOT NULL, "release_title" character varying(255) NOT NULL, "release_date" character varying, "upc" bigint NOT NULL, "popularity" integer NOT NULL, "total_tracks" integer NOT NULL, "album_type" character varying(255) NOT NULL, "release_img" character varying(255) NOT NULL, "label_name" character varying(255) NOT NULL, "updated_on" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_9fb71f3629bc9c8759f0ea89c3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sp_artist" ("id" SERIAL NOT NULL, "artist_id" character varying(255) NOT NULL, "artist_name" character varying(255) NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7ca97ffa9a9674cafb0fc33d917" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sp_artist_release" ("id" SERIAL NOT NULL, "release_id" character varying(255) NOT NULL, "artist_id" character varying(255) NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "release_id_id" integer, "artist_id_id" integer, CONSTRAINT "REL_557315462a9455f0f1a9e4057a" UNIQUE ("release_id_id"), CONSTRAINT "REL_eb2966e63a9cbd5104acb02981" UNIQUE ("artist_id_id"), CONSTRAINT "PK_edc2d03d66ec845ae3ae5e1fd81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sp_track" ("id" SERIAL NOT NULL, "track_id" character varying(255) NOT NULL, "track_title" character varying(500) NOT NULL, "duration_ms" bigint NOT NULL, "isrc" character varying(255) NOT NULL, "track_number" integer NOT NULL, "release_id" character varying(255) NOT NULL, "explicit" boolean NOT NULL, "disc_number" integer NOT NULL, "preview_url" character varying(500) NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "release_id_id" integer, CONSTRAINT "REL_ee26c0a0f39b15eb2db4a75ad5" UNIQUE ("release_id_id"), CONSTRAINT "PK_6d378b0b7c9c3498cc09af0f711" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sp_artist_track" ("id" SERIAL NOT NULL, "track_id" character varying(255) NOT NULL, "artist_id" character varying(255) NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "track_id_id" integer, "artist_id_id" integer, CONSTRAINT "REL_5cdb331c628c59acec5d9b2e3c" UNIQUE ("track_id_id"), CONSTRAINT "REL_5d052540d70791c61009f6aad1" UNIQUE ("artist_id_id"), CONSTRAINT "PK_b53993f2ff1415adad474fbad96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD CONSTRAINT "FK_557315462a9455f0f1a9e4057aa" FOREIGN KEY ("release_id_id") REFERENCES "sp_release"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD CONSTRAINT "FK_eb2966e63a9cbd5104acb02981c" FOREIGN KEY ("artist_id_id") REFERENCES "sp_artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_track" ADD CONSTRAINT "FK_ee26c0a0f39b15eb2db4a75ad5d" FOREIGN KEY ("release_id_id") REFERENCES "sp_release"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD CONSTRAINT "FK_5cdb331c628c59acec5d9b2e3c7" FOREIGN KEY ("track_id_id") REFERENCES "sp_track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD CONSTRAINT "FK_5d052540d70791c61009f6aad19" FOREIGN KEY ("artist_id_id") REFERENCES "sp_artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP CONSTRAINT "FK_5d052540d70791c61009f6aad19"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP CONSTRAINT "FK_5cdb331c628c59acec5d9b2e3c7"`);
        await queryRunner.query(`ALTER TABLE "sp_track" DROP CONSTRAINT "FK_ee26c0a0f39b15eb2db4a75ad5d"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP CONSTRAINT "FK_eb2966e63a9cbd5104acb02981c"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP CONSTRAINT "FK_557315462a9455f0f1a9e4057aa"`);
        await queryRunner.query(`DROP TABLE "sp_artist_track"`);
        await queryRunner.query(`DROP TABLE "sp_track"`);
        await queryRunner.query(`DROP TABLE "sp_artist_release"`);
        await queryRunner.query(`DROP TABLE "sp_artist"`);
        await queryRunner.query(`DROP TABLE "sp_release"`);
        await queryRunner.query(`DROP TABLE "audio_features"`);
    }

}
