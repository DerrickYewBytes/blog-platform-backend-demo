import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1717666513736 implements MigrationInterface {
    name = ' $npmConfigName1717666513736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`user\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_a65694f1ea396bbe617774b8a14\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`user\` \`user\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_a65694f1ea396bbe617774b8a14\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_fb3041108e7a2ace111b6114c9a\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_fb3041108e7a2ace111b6114c9a\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_a65694f1ea396bbe617774b8a14\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`user\` \`user\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_a65694f1ea396bbe617774b8a14\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`user\``);
    }

}
