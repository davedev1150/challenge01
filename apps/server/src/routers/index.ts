import { gt } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db";
import { productStats, products } from "../db/schema/products";
import { publicProcedure, router } from "../lib/trpc";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	getAllProducts: publicProcedure.query(async () => {
		const allProducts = await db.select().from(products).limit(50).offset(0);
		await new Promise((resolve) => setTimeout(resolve, 3000));

		return {
			products: allProducts,
		};
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
