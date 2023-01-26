import { Car } from "../types/index.ts"

import { collections } from "../db/index.ts"

import { RouterMiddleware } from "https://deno.land/x/oak@v11.1.0/mod.ts";

//Return all cars from database
const getCars: RouterMiddleware<'/cars'> = ({ response }) => {
    response.body = collections.cars.findMany(() => true).retrieveData()
}

//Return car by id
const getCar: RouterMiddleware<'/cars/:id'> = ({
  params,
  response,
}) => {
    const car = collections.cars.findOne(c => c.id === params.id)

    if (car) {
        response.status = 200
        response.body = car
    } else {
        response.status = 404;
        response.body = { message: "404 Not found" }
    }
}

//Creates new car
const createCar: RouterMiddleware<'/cars'> = async ({
  request,
  response,
}) => {
    const car: Car = await request.body().value

    collections.cars.insertOne(car)

    response.body = { success: true, data: car }
    response.status = 201
}

//Update existing car
const updateCar: RouterMiddleware<'/cars/:id'> = async ({
  params,
  request,
  response,
}) => {
    const car = collections.cars.findOne(c => c.id === params.id)

    if (car) {
        const body = await request.body().value

        collections.cars.updateOne(c => c.id === params.id, {
            id: car.id,
            model: body.model || car.model,
            price: body.price || car.price,
        })

        response.status = 200

        response.body = {
            success: true,
            data: collections.cars.findOne(c => c.id === params.id),
        }
    } else {
        response.status = 404

        response.body = {
            success: false,
            message: "Car not found",
        }
    }
}

//Delete car
const deleteCar: RouterMiddleware<'/cars/:id'> = async ({
  params,
  response,
}) => {
    console.log('HERE')        
    try {
        const result = await collections.cars.deleteOne(c => c.id === params.id)
        console.log(result)        

        if (result) {
            response.status = 200
            response.body = { success: true, message: `Car with ID ${params.id} removed` }
        } else {
            response.status = 404
            response.body = { success: false, message: `Car with ID ${params.id} not found` }
        }
    } catch (err) {
        console.error(err)
    }
}

export { getCars, getCar, createCar, updateCar, deleteCar }