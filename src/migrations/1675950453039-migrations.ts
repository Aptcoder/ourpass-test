import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1675950453039 implements MigrationInterface {
    name = 'migrations1675950453039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "deletedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "deletedAt" SET NOT NULL`);
    }

}
