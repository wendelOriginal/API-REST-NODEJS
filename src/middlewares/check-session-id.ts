import { FastifyRequest, FastifyReply } from "fastify";

export const checkSessionId  = async ( request: FastifyRequest, reply: FastifyReply ) => {

    const session = request.cookies.sessionId
   
    if(!session && request.url != '/transactions/'){
        return reply.status(401).send({
            Erro: 'Unauthorized!'
        })
    }

}