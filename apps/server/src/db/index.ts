import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { productStats, products } from "./schema/products";

const client = createClient({
	url: process.env.DATABASE_URL || "",
	authToken: process.env.DATABASE_AUTH_TOKEN || "",
});

const schema = {
	...products,
	...productStats,
};

export const db = drizzle({ client, schema });
