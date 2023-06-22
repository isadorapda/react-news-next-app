import 'dotenv/config'
import {z} from 'zod'

export const envSchema = z.object({
	NODE_ENV: z.enum(['production','test','development']).default('development'),
	PORT: z.coerce.number().default(3000),
	GITHUB_SECRET: z.string(),
	GITHUB_ID: z.string(),
	STRIPE_API_KEY: z.string()
})

const _env = envSchema.safeParse(process.env)
if(_env.success === false){
	console.error('Invalid environment variable', console.error(_env.error.format()))
	throw new Error('Invalid environment variable')
}

export const env = _env.data