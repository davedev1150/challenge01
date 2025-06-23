import "server-only";

import type { Context } from "@server/lib/context";
import { type AppRouter, appRouter } from "@server/routers";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import {
	type TRPCQueryOptions,
	createTRPCOptionsProxy,
} from "@trpc/tanstack-react-query";
import { cache } from "react";
import { makeQueryClient } from "./query-client";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

// If your router is on a separate server, pass a client:
export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: createTRPCClient({
		links: [
			httpBatchLink({
				url: `${process.env.NEXT_PUBLIC_SERVER_URL}/trpc`,
			}),
		],
	}),
	queryClient: getQueryClient,
});

export function HydrateClient(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient();
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{props.children}
		</HydrationBoundary>
	);
}

// biome-ignore lint/suspicious/noExplicitAny: TRPCQueryOptions<any> is a type that allows any query options
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
	queryOptions: T,
) {
	const queryClient = getQueryClient();
	if (queryOptions.queryKey[1]?.type === "infinite") {
		// biome-ignore lint/suspicious/noExplicitAny: TRPCQueryOptions<any> is a type that allows any query options
		void queryClient.prefetchInfiniteQuery(queryOptions as any);
	} else {
		void queryClient.prefetchQuery(queryOptions);
	}
}

export const caller = appRouter.createCaller({
	session: null,
} satisfies Context);
