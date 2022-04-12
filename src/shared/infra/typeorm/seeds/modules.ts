import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection();

  await connection.query(
    `INSERT INTO MODULES(id, name, created_at, updated_at)
      values
      ('${uuidV4()}', 'attendances', 'now()', 'now()'),
      ('${uuidV4()}', 'permissions', 'now()', 'now()'),
      ('${uuidV4()}', 'users', 'now()', 'now()')

      ON CONFLICT (name)
      DO NOTHING;
    `,
  );

  await connection.close();
}

create().then(() => console.log('Created modules!'));
