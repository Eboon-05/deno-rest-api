import { Document } from "https://deno.land/x/filedb@0.0.6/mod.ts";

export interface Car extends Document {
    model: string,
    price: number,
}

export interface User extends Document {
    username: string,
    password: string,
}