import { z } from "zod";
import { db } from "../db";
import { productStats, products } from "../db/schema/products";
import { publicProcedure, router } from "../lib/trpc";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
       getAllProducts: publicProcedure
               .input(
                       z.object({
                               limit: z.number().optional(),
                               offset: z.number().optional(),
                       }),
               )
               .query(async ({ input }) => {
                       const allProducts = await db
                               .select()
                               .from(products)
                               .orderBy(products.id)
                               .limit(input.limit ?? 20)
                               .offset(input.offset ?? 0);

                       return allProducts;
               }),
	getLatestProductStats: publicProcedure.query(async () => {
		const latestStats = await db
			.select()
			.from(productStats)
			.orderBy(productStats.created_at)
			.limit(1);

		return {
			stats: latestStats[0] || null,
		};
	}),
});
export type AppRouter = typeof appRouter;
