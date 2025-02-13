"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      disabled={pending}
      onClick={handleClick}
      className="group flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
    >
      <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
      {pending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <span className="mt-1">Delete</span>
      )}
    </button>
  );
}

export default DeleteReservation;
