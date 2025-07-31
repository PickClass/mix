import { defineContentConfig, defineCollection ,z} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    gbshl: defineCollection({
      type: 'page',
      source: 'gbshl/**/*.md',
      schema: z.object({
        tags: z.array(z.string()),
      })
    }),
    formula:defineCollection({
        type: 'data',
        source: 'formula/**/*.md'
    })
  }
})
 