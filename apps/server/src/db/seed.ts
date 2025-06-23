import { db } from "./index";
import { productStats, products } from "./schema/products";

const brands = [
	"Nike",
	"Adidas",
	"Apple",
	"Samsung",
	"Sony",
	"Dell",
	"HP",
	"Canon",
	"IKEA",
	"Zara",
];
const categories = [
	"Electronics",
	"Clothing",
	"Furniture",
	"Sports",
	"Books",
	"Home & Garden",
	"Toys",
	"Beauty",
];
const colors = [
	"Black",
	"White",
	"Red",
	"Blue",
	"Green",
	"Yellow",
	"Purple",
	"Orange",
	"Pink",
	"Gray",
];
const sizes = [
	"XS",
	"S",
	"M",
	"L",
	"XL",
	"XXL",
	"One Size",
	"Small",
	"Medium",
	"Large",
];
const materials = [
	"Cotton",
	"Plastic",
	"Metal",
	"Wood",
	"Glass",
	"Leather",
	"Polyester",
	"Silicon",
];
const seasons = ["Spring", "Summer", "Fall", "Winter", "All Season"];

function getRandomItem<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDecimal(min: number, max: number, decimals = 2): number {
	return Number.parseFloat(
		(Math.random() * (max - min) + min).toFixed(decimals),
	);
}

async function seedProducts() {
	console.log("🌱 Seeding products...");

	const productData = [];

	for (let i = 1; i <= 5000; i++) {
		const brand = getRandomItem(brands);
		const category = getRandomItem(categories);
		const color = getRandomItem(colors);
		const size = getRandomItem(sizes);
		const material = getRandomItem(materials);
		const season = getRandomItem(seasons);

		// Occasionally change some fields based on conditions
		const isElectronics = category === "Electronics";
		const isClothing = category === "Clothing";
		const isFeatured = i % 50 === 0; // Every 50th product is featured
		const isDigital = isElectronics && i % 100 === 0; // Some electronics are digital
		const isDiscontinued = i % 200 === 0; // Every 200th product is discontinued

		const price = isElectronics
			? getRandomDecimal(99.99, 2999.99)
			: getRandomDecimal(9.99, 299.99);

		const cost = price * getRandomDecimal(0.3, 0.7); // Cost is 30-70% of price

		const product = {
			sku: `SKU-${String(i).padStart(6, "0")}`,
			name: `${brand} ${category} Product ${i}`,
			description: `High-quality ${material.toLowerCase()} ${category.toLowerCase()} in ${color.toLowerCase()}. Perfect for ${season.toLowerCase()} season.`,
			brand,
			category,
			subcategory: isClothing
				? `${category} ${size}`
				: `${category} Accessories`,
			price,
			cost,
			weight: getRandomDecimal(0.1, 50.0, 3),
			length: getRandomDecimal(5.0, 100.0),
			width: getRandomDecimal(5.0, 80.0),
			height: getRandomDecimal(1.0, 50.0),
			color,
			size: isElectronics ? "Standard" : size,
			material,
			manufacturer: brand,
			country_of_origin: getRandomItem([
				"USA",
				"China",
				"Germany",
				"Japan",
				"Italy",
				"Vietnam",
				"India",
			]),
			barcode: `${getRandomNumber(1000000, 9999999)}${String(i).padStart(6, "0")}`,
			stock_quantity: getRandomNumber(0, 500),
			min_stock_level: getRandomNumber(5, 25),
			max_stock_level: getRandomNumber(100, 1000),
			is_active: !isDiscontinued,
			is_featured: isFeatured,
			is_digital: isDigital,
			requires_shipping: !isDigital,
			tax_rate: getRandomDecimal(0.05, 0.15, 4),
			warranty_months: isElectronics
				? getRandomNumber(12, 36)
				: getRandomNumber(3, 12),
			supplier_name: `${brand} Supplier Co.`,
			supplier_code: `SUP-${getRandomNumber(1000, 9999)}`,
			season,
			collection: `${season} ${new Date().getFullYear()}`,
			style: getRandomItem([
				"Classic",
				"Modern",
				"Vintage",
				"Minimalist",
				"Luxury",
			]),
			pattern: isClothing
				? getRandomItem(["Solid", "Striped", "Dotted", "Floral", "Abstract"])
				: "Solid",
			fabric_composition: isClothing
				? `${getRandomNumber(60, 100)}% ${material}`
				: null,
			care_instructions: isClothing
				? "Machine wash cold, tumble dry low"
				: "Wipe clean with damp cloth",
			tags: `${category.toLowerCase()},${brand.toLowerCase()},${color.toLowerCase()},${season.toLowerCase()}`,
			meta_title: `${brand} ${category} - ${color} ${size}`,
			meta_description: `Shop ${brand} ${category.toLowerCase()} in ${color.toLowerCase()}. High-quality ${material.toLowerCase()} construction.`,
			slug: `${brand.toLowerCase()}-${category.toLowerCase()}-${color.toLowerCase()}-${i}`.replace(
				/\s+/g,
				"-",
			),
			rating_average: getRandomDecimal(3.0, 5.0),
			rating_count: getRandomNumber(0, 500),
			view_count: getRandomNumber(0, 10000),
			purchase_count: getRandomNumber(0, 200),
			created_at: new Date(
				Date.now() - getRandomNumber(0, 365 * 24 * 60 * 60 * 1000),
			), // Random date in the last year
			updated_at: new Date(),
			last_restocked_at:
				Math.random() > 0.3
					? new Date(Date.now() - getRandomNumber(0, 90 * 24 * 60 * 60 * 1000))
					: null, // 70% chance of restock in last 90 days
			discontinued_at: isDiscontinued
				? new Date(Date.now() - getRandomNumber(30, 180) * 24 * 60 * 60 * 1000)
				: null,
		};

		productData.push(product);

		// Insert in batches of 100 for better performance
		if (productData.length === 100) {
			await db.insert(products).values(productData);
			console.log(`✅ Inserted products ${i - 99} to ${i}`);
			productData.length = 0; // Clear the array
		}
	}

	// Insert any remaining products
	if (productData.length > 0) {
		await db.insert(products).values(productData);
		console.log(`✅ Inserted remaining ${productData.length} products`);
	}

	console.log("🎉 Successfully seeded 5000 products!");
}

async function seedProductStats() {
	console.log("🌱 Seeding product stats...");

	const statsData = {
		total_products_count: 5000,
		total_views_today: getRandomNumber(1000, 5000),
		total_sales_today: getRandomNumber(50, 300),
		created_at: new Date(),
	};

	await db.insert(productStats).values(statsData);
	console.log("✅ Inserted product stats for today");
	console.log("🎉 Successfully seeded product stats!");
}

// Run the seed function
if (require.main === module) {
	Promise.all([seedProducts(), seedProductStats()])
		.then(() => {
			console.log("✨ Seeding completed!");
			process.exit(0);
		})
		.catch((error) => {
			console.error("❌ Seeding failed:", error);
			process.exit(1);
		});
}

export { seedProducts, seedProductStats };
