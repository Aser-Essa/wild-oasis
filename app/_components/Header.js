import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import { Suspense } from "react";
import Spinner from "./Spinner";

function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <Suspense fallback={<Spinner />}>
          <Navigation />
        </Suspense>
      </div>
    </header>
  );
}

export default Header;
