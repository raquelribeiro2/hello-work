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
    `INSERT INTO GROUPS(id, name, description, created_at, updated_at)
      values
      ('${uuidV4()}', 'admin', 'Administrador', 'now()', 'now()'),
      ('${uuidV4()}', 'user', 'Usuário', 'now()', 'now()');
    `,
  );

  await connection.query(
    `INSERT INTO PERMISSIONS(id, name, description, created_at, updated_at)
      values
      ('${uuidV4()}', 'create_attendance', 'Adiciona Presença', 'now()', 'now()'),
      ('${uuidV4()}', 'list_attendance', 'Acessa Presenças', 'now()', 'now()'),
      ('${uuidV4()}', 'edit_attendance', 'Edita Presença', 'now()', 'now()'),
      ('${uuidV4()}', 'delete_attendance', 'Exclui Presença', 'now()', 'now()');
    `,
  );

  await connection.query(
    `
    INSERT INTO USERS_GROUPS(user_id, group_id)
      SELECT users.id, groups.id FROM USERS
      JOIN GROUPS ON
        groups.name='admin';
    `,
  );

  await connection.query(
    `
    INSERT INTO USERS_PERMISSIONS(user_id, permission_id)
      SELECT users.id, permissions.id FROM USERS
        INNER JOIN PERMISSIONS
        	ON permissions.name='create_attendance';

    INSERT INTO USERS_PERMISSIONS(user_id, permission_id)
      SELECT users.id, permissions.id FROM USERS
        INNER JOIN PERMISSIONS
          ON permissions.name='list_attendance';

    INSERT INTO USERS_PERMISSIONS(user_id, permission_id)
      SELECT users.id, permissions.id FROM USERS
        INNER JOIN PERMISSIONS
          ON permissions.name='edit_attendance';

    INSERT INTO USERS_PERMISSIONS(user_id, permission_id)
      SELECT users.id, permissions.id FROM USERS
        INNER JOIN PERMISSIONS
          ON permissions.name='delete_attendance';
    `,
  );

  await connection.query(
    `
    INSERT INTO PERMISSIONS_GROUPS(group_id, permission_id)
      SELECT groups.id, permissions.id FROM GROUPS
        INNER JOIN PERMISSIONS
        	ON permissions.name='create_attendance';

    INSERT INTO PERMISSIONS_GROUPS(group_id, permission_id)
      SELECT groups.id, permissions.id FROM GROUPS
        INNER JOIN PERMISSIONS
          ON permissions.name='list_attendance';

    INSERT INTO PERMISSIONS_GROUPS(group_id, permission_id)
      SELECT groups.id, permissions.id FROM GROUPS
        INNER JOIN PERMISSIONS
          ON permissions.name='edit_attendance';

    INSERT INTO PERMISSIONS_GROUPS(group_id, permission_id)
      SELECT groups.id, permissions.id FROM GROUPS
        INNER JOIN PERMISSIONS
          ON permissions.name='delete_attendance';
    `,
  );

  await connection.close();
}

create().then(() => console.log('Admin user created'));
