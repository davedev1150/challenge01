import { caller } from "@/lib/trpc/server";

export default async function Header() {
	const healthCheck = await caller.healthCheck();
	return (
		<div>
			<div className="flex flex-row items-center gap-2 px-2 py-1">
				<h2 className="font-medium">API Status:</h2>
				<span className="text-muted-foreground text-sm">
					{healthCheck ? "Connected" : "Disconnected"}
				</span>
			</div>
			<hr />
		</div>
	);
}
