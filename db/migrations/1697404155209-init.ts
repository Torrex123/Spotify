import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697404155209 implements MigrationInterface {
    name = 'Init1697404155209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sp_track" DROP COLUMN "explicit"`);
        await queryRunner.query(`ALTER TABLE "sp_track" ADD "explicit" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sp_track" DROP COLUMN "explicit"`);
        await queryRunner.query(`ALTER TABLE "sp_track" ADD "explicit" boolean NOT NULL`);
    }

}
