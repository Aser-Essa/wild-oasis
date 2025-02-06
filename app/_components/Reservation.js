import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import LoginMessage from "./LoginMessage";
import { auth } from "../_lib/nextAuth";

async function Reservation({ cabin }) {
  const [settings, BookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <>
      <div className="bordrer grid min-h-[400px] grid-cols-2 border-primary-800">
        <DateSelector
          settings={settings}
          BookedDates={BookedDates}
          cabin={cabin}
          user={session?.user}
        />
        {session?.user ? (
          <ReservationForm cabin={cabin} user={session?.user} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </>
  );
}

export default Reservation;
