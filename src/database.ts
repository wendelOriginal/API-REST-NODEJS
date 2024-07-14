import {knex as k, Knex} from "knex";
import { env } from './env/index'

export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: 'db/migration'
    }
}
export const knex = k(config) 