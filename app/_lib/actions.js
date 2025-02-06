"use server";

import { redirect } from "next/navigation";
import { getBookings } from "./data-service";
import { auth, signIn, signOut } from "./nextAuth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function signInActon() {
  return signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutActon() {
  return signOut({
    redirectTo: "/",
  });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("User Is Not Authenticated");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Invalid NationalID");

  const updatedDate = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedDate)
    .eq("id", session.user.guestId);

  revalidatePath("/account/profile");

  if (error) {
    throw new Error("Guest could not be updated");
  }
}

export async function createReservation(bookedData, formData) {
  const session = await auth();
  if (!session) throw new Error("User Is Not Authenticated");

  const newBooking = {
    ...bookedData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    extrasPrice: 0,
    totalPrice: bookedData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  console.log(newBooking);

  const { error } = await supabase.from("bookings").insert([newBooking]);

  revalidatePath(`/cabins/${bookedData.cabinId}`);
  if (error) throw new Error("Booking could not be created");
  redirect("/thank-you");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("User Is Not Authenticated");

  const bookings = await getBookings(session.user.guestId);

  const bookingsIds = bookings.map((el) => el.id);

  if (!bookingsIds.includes(+bookingId))
    throw new Error("Haven't Access To This Booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  revalidatePath("/account/reservations");
  revalidatePath("/account/reservations");

  if (error) throw new Error("Booking could not be deleted");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("User Is Not Authenticated");

  const bookingId = formData.get("bookingId");

  const bookings = await getBookings(session.user.guestId);
  const bookingsIds = bookings.map((el) => el.id);

  if (!bookingsIds.includes(+bookingId))
    throw new Error("Haven't Access To This Booking");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");

  const updatedFields = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId);

  revalidatePath("/account/reservations/edit");

  if (error) throw new Error("Booking could not be updated");

  redirect("/account/reservations");
}
