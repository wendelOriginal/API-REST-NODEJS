import "dotenv/config"
import { z } from 'zod'

const envShema = z.object({
    DATABASE_URL: z.string(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    
})

const _env = envShema.safeParse(process.env)

if(_env.success == false){
    console.error('Verifique as variaveis de ambiente ! '+ _env.error.format())
    throw Error('Erro nas variaveis de ambiente')
}

export const env = _env.data
