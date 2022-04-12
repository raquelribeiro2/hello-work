import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcryptjs';

import createConnection from '../index';

async function create() {
  const connection = await createConnection();

  const password = await hash(`${process.env.USER_ADMIN_PASSWORD}`, 8);

  await connection.query(
    `INSERT INTO USERS(id, name, document, password, created_at, updated_at)
      values
      ('${uuidV4()}', 'Usuário Administrador', '${
      process.env.USER_ADMIN_DOCUMENT
    }', '${password}', 'now()', 'now()');
    `,
  );

  await connection.query(
    `INSERT INTO GROUPS(id, name, type, created_at, updated_at)
      values
      ('${uuidV4()}', 'Administrador', 'admin',  'now()', 'now()'),
      ('${uuidV4()}', 'Usuário', 'user', 'now()', 'now()');
    `,
  );

  await connection.query(
    `
    INSERT INTO USERS_GROUPS(user_id, group_id)
      SELECT users.id, groups.id FROM USERS
      JOIN GROUPS ON
        groups.type='admin';
    `,
  );

  await connection.query(
    `
    INSERT INTO PERMISSIONS(id, "canCreate", "canEdit", "canView", "canDelete", module_id, group_id, created_at, updated_at)
		  values
				(
					'${uuidV4()}',
					true,
          true,
          true,
          true,
          (SELECT id AS module_id FROM MODULES
          	WHERE modules.name='attendances'),
          (SELECT id AS group_id FROM GROUPS
            WHERE groups.type='admin'),
          'now()',
          'now()'
         );

    INSERT INTO PERMISSIONS(id, "canCreate", "canEdit", "canView", "canDelete", module_id, group_id, created_at, updated_at)
    values
      (
        '${uuidV4()}',
        true,
        true,
        true,
        true,
        (SELECT id AS module_id FROM MODULES
          WHERE modules.name='permissions'),
        (SELECT id AS group_id FROM GROUPS
          WHERE groups.type='admin'),
        'now()',
        'now()'
      );

    INSERT INTO PERMISSIONS(id, "canCreate", "canEdit", "canView", "canDelete", module_id, group_id, created_at, updated_at)
    values
      (
        '${uuidV4()}',
        true,
        true,
        true,
        true,
        (SELECT id AS module_id FROM MODULES
          WHERE modules.name='users'),
        (SELECT id AS group_id FROM GROUPS
          WHERE groups.type='admin'),
        'now()',
        'now()'
        );

    `,
  );

  await connection.close();
}

create().then(() => console.log('Admin user created!'));
