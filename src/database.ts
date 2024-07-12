import {knex as k, Knex} from "knex";
export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: 'db/app.db'
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: 'db/migration'
    }
}
export const knex = k(config) 