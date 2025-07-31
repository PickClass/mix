// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ui: {
    fonts: false
  },
   content: {
    build: {
    
      markdown: {
        highlight: {
          // Theme used in all color schemes.
          // theme: 'github-light',
          // OR
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          }
        }
      },
      transformers:[
        '~~/transformers/title-suffix',
      ],
    }
  },
  // hooks: {
  //   'content:file:beforeParse'(ctx) {
  //     const { file } = ctx;
      
  //     if (file.id.endsWith(".md")) {
  //       file.body = file.body.replace(/react/gi, "Vue");
  //     }
  //   },
  //   'content:file:afterParse'(ctx) {
  //     const { file, content } = ctx;
  //     const wordsPerMinute = 180;
  //     const text = typeof file.body === 'string' ? file.body : '';
  //     const wordCount = text.split(/\s+/).length;

  //     content.readingTime = Math.ceil(wordCount / wordsPerMinute);
  //   }
  // },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image'
  ]
})
