
import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run server.ts",
      desc: "Start the server with live reload",
      allow: ['read', 'write', 'env', 'net'],
      watch: false
    },
  },

};

export default config;