import fastify from "fastify"
import { knex } from "./database"

const app = fastify()
app.get('/', async () => {
    const k = knex('sqlite_schema').select('*')
    return k
})

app.listen({
    port:3333
}).then(() => console.log("running server !"))
