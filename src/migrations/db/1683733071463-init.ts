import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683733071463 implements MigrationInterface {
    name = 'Init1683733071463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."employee_role_enum" AS ENUM('manager', 'role1', 'role2')`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "firstDayAtWork" TIMESTAMP WITH TIME ZONE NOT NULL, "role" "public"."employee_role_enum" NOT NULL, "managerId" uuid, "teamId" uuid, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_f4a920dfa304e096fad40e8c4a0" FOREIGN KEY ("managerId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_0eacf66087e6d7824ae2f2ada52" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_0eacf66087e6d7824ae2f2ada52"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_f4a920dfa304e096fad40e8c4a0"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TYPE "public"."employee_role_enum"`);
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
