import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1592869854769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                            {
                                name: 'id',
                                type: 'uuid',
                                isPrimary: true,
                                generationStrategy: 'uuid',
                                default: 'uuid_generate_v4()'
                            },
                            {
                                name: 'provider',
                                type: 'varchar',
                                isNullable: false,
                            },
                            {
                                name: 'date',
                                type: 'timestamp with time zone',
                                isNullable: false,
                            },
                            {
                                name: 'created_at',
                                type: 'timestamp',
                                default: 'now()',
                            },
                            {
                                name: 'updated_at',
                                type: 'varchar',
                                default: 'now()',
                            }
                          ]
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments')
    }
    

}
