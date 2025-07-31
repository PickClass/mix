import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
  name: 'title-suffix',
  extensions: ['.md'], // File extensions to apply this transformer to
  transform(file) {
    // Modify the file object as needed
    return {
      ...file,
    }
  },
})
 