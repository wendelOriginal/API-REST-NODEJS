import fastify from "fastify"
import { transactions } from "./routes/transactions"

const app = fastify()

app.register(transactions, {
    prefix: 'transactions'
})

app.listen({
    port: 3333
}).then(() => console.log("running server !"))
