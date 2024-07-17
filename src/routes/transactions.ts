import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionId } from '../middlewares/check-session-id'


export const transactions = async (app: FastifyInstance) =>{

    app.addHook('preHandler',checkSessionId)

    app.get('/', async (request) => {

        const session = request.cookies.sessionId
        const transactions = await knex('transactions').select().where('session_id', session)

        return { transactions }
    })


    app.get('/sumary', async (request, reply) => {

        const session = request.cookies.sessionId

        const sumary = await knex('transactions').sum('amount', { as: 'amount'}).where('session_id', session)
        return reply.status(200).send({sumary})
    })

    app.get('/:id', async (request) => {

        const validate = z.object({
            id: z.string().uuid()
        })

       const { id } = validate.parse(request.params)
       const session  = request.cookies.sessionId
       const transaction = await knex('transactions').where('id', id).where('session_id', session).first()

       return { transaction }
        
    })

    app.post('/', async (request, reply) => {
        
        const dataValidate = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })
        let session = request.cookies.sessionId
        
        if(!session){
            session = randomUUID()
        }

         
        const {title, amount, type} = dataValidate.parse(request.body)

           const save = await knex('transactions').insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                session_id: session
            })
             if(save){

                 return reply.status(201).setCookie('sessionId', session, {
                    maxAge: 60 * 24 * 7,
                    path: '/'
                 }).send()
             }  
             
             throw Error('Entre em contado com back-end da aplicação !')
      })
}
