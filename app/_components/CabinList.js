import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

export default async function CabinList({ filter }) {
  noStore();
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayCabins;

  if (filter === "all") displayCabins = cabins;

  if (filter === "small")
    displayCabins = cabins.filter((el) => el?.maxCapacity <= 2);

  if (filter === "medium")
    displayCabins = cabins.filter(
      (el) => el?.maxCapacity >= 3 && el?.maxCapacity <= 7,
    );

  if (filter === "large")
    displayCabins = cabins.filter((el) => el?.maxCapacity >= 8);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
