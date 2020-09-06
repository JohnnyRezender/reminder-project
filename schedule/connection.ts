import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve("/server/database/database.sqlite", 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;