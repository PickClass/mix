import { defineEventHandler } from "h3";

export default defineEventHandler(async event => {
  console.log();
  return "Hello Nitro";
});
