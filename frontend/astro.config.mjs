// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import dotenv from 'dotenv';
dotenv.configDotenv({'path': './.env'});
console.log(import.meta.env);


// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
});
