"use client";
import Image from "next/image";
import { useReservationContext } from "./ReservationProvide";
import { differenceInDays } from "date-fns";
import { createReservation } from "../_lib/actions";
import Button from "./Button";

function ReservationForm({ cabin, user }) {
  const { range, setRange, resetRange } = useReservationContext();

  // CHANGE
  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(range.to, range.from);

  const { maxCapacity, discount, regularPrice, id: cabinId } = cabin;

  const cabinPrice = numNights * (regularPrice - discount);

  const bookedData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId,
  };

  const createReservationWithData = createReservation.bind(null, bookedData);

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <Image
            height={32}
            width={32}
            // Important to display google profile images
            // referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          resetRange();
          await createReservationWithData(formData);
        }}
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          {startDate && endDate ? (
            <Button>Reserve now</Button>
          ) : (
            <p className="text-base text-primary-300">
              Start by selecting dates
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
