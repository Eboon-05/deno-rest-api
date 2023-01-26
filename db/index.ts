import { FileDB } from "https://deno.land/x/filedb@0.0.6/mod.ts"

import { Car, User } from "../types/index.ts"

// import { cars as carsArray } from '../constants/index.ts'

const db = new FileDB({ rootDir: "./data", isAutosave: true })

async function getCollections() {
    try {
        const users = await db.getCollection<User>('users')
        const cars = await db.getCollection<Car>('cars')

        // if (!cars.findOne(() => true)) {
        //     cars.insertMany(carsArray)
        // }

        return {
            cars,
            users,
        }
    } catch (error) {
        throw error
    }
}

const collections = await getCollections()

export {
    db,
    collections,
}