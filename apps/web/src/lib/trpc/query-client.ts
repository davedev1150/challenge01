import {
	QueryClient,
	defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// Set some default staleTime above 0 to avoid refetching immediately on the client.
				staleTime: 30 * 1000,
			},
			dehydrate: {
				// This decides which queries to "save" when moving from server to client.
				// We include pending queries (ones still loading) so we can start fetching
				// data on the server and finish loading it on the client seamlessly.
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
		},
	});
}
