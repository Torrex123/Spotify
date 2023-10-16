import { MigrationInterface, QueryRunner } from "typeorm";

export class Sql1697422044766 implements MigrationInterface {
    name = 'Sql1697422044766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sp_track" ADD "isrc_id" integer`);
        await queryRunner.query(`ALTER TABLE "sp_track" ADD CONSTRAINT "UQ_8375d31eff9955bbcabdc95f2ef" UNIQUE ("isrc_id")`);
        await queryRunner.query(`ALTER TABLE "sp_track" ADD CONSTRAINT "FK_8375d31eff9955bbcabdc95f2ef" FOREIGN KEY ("isrc_id") REFERENCES "audio_features"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sp_track" DROP CONSTRAINT "FK_8375d31eff9955bbcabdc95f2ef"`);
        await queryRunner.query(`ALTER TABLE "sp_track" DROP CONSTRAINT "UQ_8375d31eff9955bbcabdc95f2ef"`);
        await queryRunner.query(`ALTER TABLE "sp_track" DROP COLUMN "isrc_id"`);
    }

}
