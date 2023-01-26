import { RouterMiddleware } from "https://deno.land/x/oak@v11.1.0/mod.ts"

import { verify } from 'https://deno.land/x/djwt@v2.8/mod.ts'
import { key } from "../constants/index.ts"

export const authMiddleware: RouterMiddleware<''> = async (
    {
        request,
        response
    },
    next
) => {
    try {
        const headAuth = request.headers.get('Authorization')
    
        if (!headAuth) {
            response.status = 498
            response.body = 'Missing JWT'
        } else {
            await verify(headAuth.split(' ')[1], key)
            await next()
        }
    } catch (err) {
        console.log(err.message)
        
        if (err.message.includes('jwt')) {
            response.status = 498
            response.body = 'Invalid or expired token'
        } else {
            response.status = 500
            response.body = 'Internal server error'
        }
    }
}