import { Suspense } from "react";
import { ProductStats } from "@/app/_components/stat";
import ProductsTableWrapper from "./_components/ProductsTableWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { caller } from "@/lib/trpc/server";

export default async function Home() {
       const { stats } = await caller.getLatestProductStats();

       return (
               <div className="container mx-auto px-4 py-8">
                       <div className="grid gap-6">
                               <ProductStats stats={stats} />
                               <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                                       <ProductsTableWrapper />
                               </Suspense>
                       </div>
               </div>
       );
}
