"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

function ReservationProvide({ children }) {
  const initialState = { from: null, to: null };
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <>
      <ReservationContext.Provider value={{ range, setRange, resetRange }}>
        {children}
      </ReservationContext.Provider>
    </>
  );
}

function useReservationContext() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("Use Context OutSide Provider");
  }
  return context;
}

export { ReservationProvide, useReservationContext };
