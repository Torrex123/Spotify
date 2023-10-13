import { MigrationInterface, QueryRunner } from "typeorm";

export class Initv21697220845272 implements MigrationInterface {
    name = 'Initv21697220845272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD "release_id_release_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD CONSTRAINT "UQ_3c93ce54ab2a941f4ef15100c76" UNIQUE ("release_id_release_id")`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD "artist_id_artist_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD CONSTRAINT "UQ_73188b515dfaf92430e641c635e" UNIQUE ("artist_id_artist_id")`);
        await queryRunner.query(`ALTER TABLE "sp_track" ADD "release_id_release_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sp_track" ADD CONSTRAINT "UQ_d442b9b067021a3c1ce46e9f9aa" UNIQUE ("release_id_release_id")`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD "track_id_track_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD CONSTRAINT "UQ_d0a6ec910f3edd9a3bd1121334b" UNIQUE ("track_id_track_id")`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD "artist_id_artist_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD CONSTRAINT "UQ_1d8e051797e2b079506be6eae2f" UNIQUE ("artist_id_artist_id")`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP COLUMN "artist_id"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD "artist_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP COLUMN "artist_id"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD "artist_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
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
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP COLUMN "artist_id"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" ADD "artist_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP COLUMN "artist_id"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" ADD "artist_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP CONSTRAINT "UQ_1d8e051797e2b079506be6eae2f"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP COLUMN "artist_id_artist_id"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP CONSTRAINT "UQ_d0a6ec910f3edd9a3bd1121334b"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_track" DROP COLUMN "track_id_track_id"`);
        await queryRunner.query(`ALTER TABLE "sp_track" DROP CONSTRAINT "UQ_d442b9b067021a3c1ce46e9f9aa"`);
        await queryRunner.query(`ALTER TABLE "sp_track" DROP COLUMN "release_id_release_id"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP CONSTRAINT "UQ_73188b515dfaf92430e641c635e"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP COLUMN "artist_id_artist_id"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP CONSTRAINT "UQ_3c93ce54ab2a941f4ef15100c76"`);
        await queryRunner.query(`ALTER TABLE "sp_artist_release" DROP COLUMN "release_id_release_id"`);
    }

}
