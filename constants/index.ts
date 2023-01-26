import { Car } from "../types/index.ts"

//Array cars
export const cars: Array<Car> = [
  {
    id: "1",
    model: "Kia Morning",
    price: 5490990,
  },
  {
    id: "2",
    model: "Kia Cerato",
    price: 10990990,
  },
  {
    id: "3",
    model: "Kia Sportage",
    price: 14990990,
  },
  {
    id: "4",
    model: "Kia Stinger",
    price: 29990990,
  },
  {
    id: "5",
    model: "Kia Rio",
    price: 7990990,
  },
]

export const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"],
);