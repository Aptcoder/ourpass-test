import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1675964806887 implements MigrationInterface {
    name = 'migrations1675964806887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "body" character varying NOT NULL, "userId" character varying NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "userId " uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_fb9316c88ce18903d6986e8f1c0" FOREIGN KEY ("userId ") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_fb9316c88ce18903d6986e8f1c0"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
