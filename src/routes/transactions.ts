import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export const transactions = async (app: FastifyInstance) =>{

    app.get('/', async () => {
        const transactions = await knex('transactions').select()

        return { transactions }
    })

    app.get('/:id', async (request) => {

        const validate = z.object({
            id: z.string().uuid()
        })

       const { id } = validate.parse(request.params)
       
       const transaction = await knex('transactions').where('id', id).first()

       return { transaction }
        
    })



    app.post('/', async (request, reply) => {
        
        const dataValidate = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const {title, amount, type} = dataValidate.parse(request.body)

           const save = await knex('transactions').insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
            })
             if(save){

                 return reply.status(200).send()
             }  
             
             throw Error('Entre em contado com back-end da aplicação !')
      })
}
