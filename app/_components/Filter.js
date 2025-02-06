"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  function filterUrl(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`);
  }

  const filter = searchParams.get("capacity") ?? "all";

  return (
    <div className="mb-2 flex border border-primary-800">
      <button
        className={`w-[80px] px-5 py-2 hover:bg-primary-900 ${filter === "all" ? "bg-primary-900" : ""}`}
        onClick={() => filterUrl("all")}
      >
        All
      </button>
      <button
        className={`w-[80px] px-5 py-2 hover:bg-primary-900 ${filter === "small" ? "bg-primary-900" : ""}`}
        onClick={() => filterUrl("small")}
      >
        0&mdash;2
      </button>
      <button
        className={`w-[80px] px-5 py-2 hover:bg-primary-900 ${filter === "medium" ? "bg-primary-900" : ""}`}
        onClick={() => filterUrl("medium")}
      >
        3&mdash;7
      </button>
      <button
        className={`w-[80px] px-5 py-2 hover:bg-primary-900 ${filter === "large" ? "bg-primary-900" : ""}`}
        onClick={() => filterUrl("large")}
      >
        8&mdash;12
      </button>
    </div>
  );
}

export default Filter;
