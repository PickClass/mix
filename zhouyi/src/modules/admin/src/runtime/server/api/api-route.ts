
import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  return {
    message: 'Hello from Nuxt 3 module API!'
  }
})
