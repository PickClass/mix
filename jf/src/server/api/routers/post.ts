import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { article } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // await ctx.db.insert(article).values({
      //   name: input.name,
      // });
      return input
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.article.findFirst({
      orderBy: (article, { desc }) => [desc(article.id)],
    });

    return post ?? null;
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.article.findFirst({
        where: (article, { eq }) => eq(article.id, Number(input.id)),
      });

      return post ?? null;
    }),
});
