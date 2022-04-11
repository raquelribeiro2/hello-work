import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePermissionsGroups1649622237762
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permissions_groups',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'group_id',
            type: 'uuid',
          },
          {
            name: 'permission_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'GroupId',
            referencedTableName: 'groups',
            referencedColumnNames: ['id'],
            columnNames: ['group_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'PermissionId',
            referencedTableName: 'permissions',
            referencedColumnNames: ['id'],
            columnNames: ['permission_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permissions_groups');
  }
}
