import { MigrationInterface, QueryRunner } from "typeorm";

export class Initv31697226104363 implements MigrationInterface {
    name = 'Initv31697226104363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bp_artist_release" ADD "artist_id_release_id" integer`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" ADD CONSTRAINT "UQ_85d91e3656714274a8d82e3c8f8" UNIQUE ("artist_id_release_id")`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" ADD "release_id_release_id" integer`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" ADD CONSTRAINT "UQ_821117ae0d7b57c7fd51ba80263" UNIQUE ("release_id_release_id")`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" ADD "release_id_release_id" integer`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" ADD CONSTRAINT "UQ_cf6ff9157e02f04420f6de2603e" UNIQUE ("release_id_release_id")`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" ADD "track_id_track_id" integer`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" ADD "track_id_genre_id" integer`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" ADD "track_id_subgenre_id" integer`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" ADD "label_id_label_id" integer`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" ADD CONSTRAINT "UQ_0785d354106c593303a8d275f4d" UNIQUE ("label_id_label_id")`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" ADD "artist_id_release_id" integer`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" ADD CONSTRAINT "UQ_75f3e6daff0d7b0c0cf86ef4bb5" UNIQUE ("artist_id_release_id")`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" ADD CONSTRAINT "REL_1e14ad114c884f78da27228967" UNIQUE ("track_id_track_id", "track_id_genre_id", "track_id_subgenre_id")`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" ADD CONSTRAINT "FK_85d91e3656714274a8d82e3c8f8" FOREIGN KEY ("artist_id_release_id") REFERENCES "bp_artist"("artist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" ADD CONSTRAINT "FK_821117ae0d7b57c7fd51ba80263" FOREIGN KEY ("release_id_release_id") REFERENCES "bp_release"("release_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" ADD CONSTRAINT "FK_cf6ff9157e02f04420f6de2603e" FOREIGN KEY ("release_id_release_id") REFERENCES "bp_release"("release_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" ADD CONSTRAINT "FK_1e14ad114c884f78da272289677" FOREIGN KEY ("track_id_track_id", "track_id_genre_id", "track_id_subgenre_id") REFERENCES "bp_track"("track_id","genre_id","subgenre_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" ADD CONSTRAINT "FK_0785d354106c593303a8d275f4d" FOREIGN KEY ("label_id_label_id") REFERENCES "bp_label"("label_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" ADD CONSTRAINT "FK_75f3e6daff0d7b0c0cf86ef4bb5" FOREIGN KEY ("artist_id_release_id") REFERENCES "bp_artist"("artist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bp_label_artist" DROP CONSTRAINT "FK_75f3e6daff0d7b0c0cf86ef4bb5"`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" DROP CONSTRAINT "FK_0785d354106c593303a8d275f4d"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" DROP CONSTRAINT "FK_1e14ad114c884f78da272289677"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" DROP CONSTRAINT "FK_cf6ff9157e02f04420f6de2603e"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" DROP CONSTRAINT "FK_821117ae0d7b57c7fd51ba80263"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" DROP CONSTRAINT "FK_85d91e3656714274a8d82e3c8f8"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" DROP CONSTRAINT "REL_1e14ad114c884f78da27228967"`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" DROP CONSTRAINT "UQ_75f3e6daff0d7b0c0cf86ef4bb5"`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" DROP COLUMN "artist_id_release_id"`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" DROP CONSTRAINT "UQ_0785d354106c593303a8d275f4d"`);
        await queryRunner.query(`ALTER TABLE "bp_label_artist" DROP COLUMN "label_id_label_id"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" DROP COLUMN "track_id_subgenre_id"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" DROP COLUMN "track_id_genre_id"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" DROP COLUMN "track_id_track_id"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" DROP CONSTRAINT "UQ_cf6ff9157e02f04420f6de2603e"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_track" DROP COLUMN "release_id_release_id"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" DROP CONSTRAINT "UQ_821117ae0d7b57c7fd51ba80263"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" DROP COLUMN "release_id_release_id"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" DROP CONSTRAINT "UQ_85d91e3656714274a8d82e3c8f8"`);
        await queryRunner.query(`ALTER TABLE "bp_artist_release" DROP COLUMN "artist_id_release_id"`);
    }

}
