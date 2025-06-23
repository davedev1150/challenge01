import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductStats as ProductStatsType } from "@server/db/schema/products";

export function ProductStats({ stats }: { stats: ProductStatsType }) {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">Total Products</CardTitle>
					<div className="h-4 w-4 text-muted-foreground">📦</div>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">
						{stats.total_products_count.toLocaleString()}
					</div>
					<p className="text-muted-foreground text-xs">Products in catalog</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">Views Today</CardTitle>
					<div className="h-4 w-4 text-muted-foreground">👁️</div>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">
						{stats.total_views_today.toLocaleString()}
					</div>
					<p className="text-muted-foreground text-xs">Page views today</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-medium text-sm">Sales Today</CardTitle>
					<div className="h-4 w-4 text-muted-foreground">💰</div>
				</CardHeader>
				<CardContent>
					<div className="font-bold text-2xl">{stats.total_sales_today}</div>
					<p className="text-muted-foreground text-xs">Sales completed today</p>
				</CardContent>
			</Card>
		</div>
	);
}
