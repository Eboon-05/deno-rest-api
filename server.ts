import("./.env.ts").catch(console.error)

import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts"

import { router } from './router.ts'

const app = new Application()

const PORT = parseInt(Deno.env.get('PORT') || '') || 8000

// Logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
})
  
// Timing
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
})

app.use(router.routes())
app.use(router.allowedMethods())

console.info(`Ready! Listening to http://localhost:${PORT}`)
await app.listen({ port: PORT })