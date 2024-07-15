import fastify from "fastify"
import { transactions } from "./routes/transactions"
import cookie from '@fastify/cookie'


const app = fastify()
app.register(cookie)
app.register(transactions, {
    prefix: 'transactions/'
})

app.listen({
    port: 3333
}).then(() => console.log("running server !"))
