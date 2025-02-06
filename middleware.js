import { auth } from "./app/_lib/nextAuth";

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
