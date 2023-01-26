import { RouterMiddleware } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

import {
    create, getNumericDate,
} from 'https://deno.land/x/djwt@v2.8/mod.ts'

import { User } from "../types/index.ts"
import { collections } from "../db/index.ts"
import { key } from "../constants/index.ts"

export const signUp: RouterMiddleware<'/users'> = async (
    { request: req, response: res }
) => {
    if (!req.hasBody) {
        res.status = 400
        res.body = 'Missing body'
        return
    }

    const body = await req.body().value

    if (body.username && body.password) {
        const newUser: User = {
            username: body.username as string,
            password: bcrypt.hashSync(body.password)
        }

        const exists = await collections.users.findOne(user => user.username === newUser.username)

        if (exists) {
            res.status = 409
            res.body = `User ${newUser.username} already exists`
            return
        }

        const doc = await collections.users.insertOne(newUser)

        const token = await create(
            {
                alg: "HS256",
                typ: "JWT",
            },
            {
                sub: doc.id,
                // 60 seconds * 60 times = 1 hour
                exp: getNumericDate(60 * 60)
            },
            key
        )

        res.status = 201
        res.body = {
            message: `User ${newUser.username} created!`,
            token
        }

        return
    }
    
    res.status = 400
    res.body = {
        message: 'Missing username or password'
    }
}

export const logIn: RouterMiddleware<'/login'> = async (
    { request: req, response: res }
) => {
    if (!req.hasBody) {
        res.status = 400
        res.body = 'Missing body'
        return
    }

    const body = await req.body().value

    if (!body) {
        res.status = 500
        res.body = 'Missing request body?'
    }

    if (body.password && body.username) {
        const user = collections.users.findOne(x => x.username === body.username)

        if (!user) {
            res.status = 404
            res.body = `User ${body.username} not found!`
            return
        }

        const match = await bcrypt.compare(body.password, user.password)

        if (!match) {
            res.status = 401
            res.body = 'Wrong password'
            return
        }

        const token = await create(
            {
                alg: "HS256",
                typ: "JWT",
            },
            {
                sub: user.id,
                // 60 seconds * 60 times = 1 hour
                exp: getNumericDate(60 * 60)
            },
            key
        )

        res.body = {
            username: user.username,
            token
        }
    }
}