# Deno REST API

A simple REST API made with deno and oak. It has a simple json DB included.

## API architecture

![Diagram](./docs/diagram-dark.png#gh-dark-mode-only)
![Diagram](./docs/diagram.png#gh-light-mode-only)

## Try it yourself!

First, install [`denon`](https://deno.land/x/denon@2.5.0) (kinda like `nodemon`, but for deno):

```bash
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

Then, launch the server with:

```bash
denon run start
```

I made an Insomnia document for testing the API during development. You can use it too! Just import the `docs/Insomnia-test.yaml` to your Insomnia application. Everytime you log in or sign up, copy the `token` in the API response into the `token` environment variable.