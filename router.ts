import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"

import { createCar, deleteCar, getCars, updateCar } from "./controllers/car.ts"
import { logIn, signUp } from "./controllers/user.ts"
import { authMiddleware } from "./middlewares/auth.ts"

const router = new Router()

router
    .get('/', (ctx) => {
        ctx.response.body = 'Hello world'
    })
    .put('/signup', signUp)
    .put('/login', logIn)
    .get("/cars", getCars)
    .get("/cars/:id", getCars)
    .post("/cars", authMiddleware, createCar)
    .put("/cars/:id", authMiddleware, updateCar)
    .delete("/cars/:id", authMiddleware, deleteCar)

export { router }