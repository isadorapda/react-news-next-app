import { env } from '@/env'
import Prismic from '@prismicio/client'

export function getPrismicClient(){
    
    const prismic = Prismic.createClient('reactLatestNews',{
        accessToken: env.PRISMIC_ACCESS_TOKEN,

    })

    return prismic
}