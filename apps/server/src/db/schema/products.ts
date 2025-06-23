import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	sku: text("sku").notNull(),
	name: text("name").notNull(),
	description: text("description"),
	brand: text("brand"),
	category: text("category"),
	subcategory: text("subcategory"),
	price: real("price"),
	cost: real("cost"),
	weight: real("weight"),
	length: real("length"),
	width: real("width"),
	height: real("height"),
	color: text("color"),
	size: text("size"),
	material: text("material"),
	manufacturer: text("manufacturer"),
	country_of_origin: text("country_of_origin"),
	barcode: text("barcode"),
	stock_quantity: integer("stock_quantity").default(0),
	min_stock_level: integer("min_stock_level").default(0),
	max_stock_level: integer("max_stock_level").default(0),
	is_active: integer("is_active", { mode: "boolean" }).default(true),
	is_featured: integer("is_featured", { mode: "boolean" }).default(false),
	is_digital: integer("is_digital", { mode: "boolean" }).default(false),
	requires_shipping: integer("requires_shipping", { mode: "boolean" }).default(
		true,
	),
	tax_rate: real("tax_rate"),
	warranty_months: integer("warranty_months"),
	supplier_name: text("supplier_name"),
	supplier_code: text("supplier_code"),
	season: text("season"),
	collection: text("collection"),
	style: text("style"),
	pattern: text("pattern"),
	fabric_composition: text("fabric_composition"),
	care_instructions: text("care_instructions"),
	tags: text("tags"),
	meta_title: text("meta_title"),
	meta_description: text("meta_description"),
	slug: text("slug"),
	rating_average: real("rating_average"),
	rating_count: integer("rating_count").default(0),
	view_count: integer("view_count").default(0),
	purchase_count: integer("purchase_count").default(0),
	created_at: integer("created_at", { mode: "timestamp" }),
	updated_at: integer("updated_at", { mode: "timestamp" }),
	last_restocked_at: integer("last_restocked_at", { mode: "timestamp" }),
	discontinued_at: integer("discontinued_at", { mode: "timestamp" }),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const productStats = sqliteTable("product_stats", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	total_products_count: integer("total_products_count").notNull().default(0),
	total_views_today: integer("total_views_today").notNull().default(0),
	total_sales_today: integer("total_sales_today").notNull().default(0),
	created_at: integer("created_at", { mode: "timestamp" }).notNull(),
});

export type ProductStats = typeof productStats.$inferSelect;
export type NewProductStats = typeof productStats.$inferInsert;
