import { z } from 'zod';
import { article } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

import {
	createTRPCRouter,
	// protectedProcedure,
	publicProcedure,
} from '~/server/api/trpc';

export const putRouter = createTRPCRouter({
	// prefix: t.procedure.input(callable).query(async (args) => handler(args)),
	put: publicProcedure
		.input(z.object({ id: z.string(), text: z.string().min(1) }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.update(article).set({ text: input.text }).where(eq(article.id, Number(input.id)));
			return input;
		}),
});
