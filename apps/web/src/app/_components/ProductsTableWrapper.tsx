"use client";

import dynamic from "next/dynamic";

const InfiniteProductsTable = dynamic(
  () => import("./_components/productsTable").then((m) => m.InfiniteProductsTable),
  { ssr: false },
);

export default function ProductsTableWrapper() {
  return <InfiniteProductsTable />;
}
