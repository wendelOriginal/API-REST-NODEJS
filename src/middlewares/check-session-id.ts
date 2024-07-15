import { FastifyRequest, FastifyReply } from "fastify";

export const checkSessionId  = async ( request: FastifyRequest, reply: FastifyReply ) => {

    const session = request.cookies.sessionId
    console.log(session)
    if(!session){
        return reply.status(401).send({
            Erro: 'Unauthorized!'
        })
    }

}