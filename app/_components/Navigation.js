import Link from "next/link";
import { auth } from "../_lib/nextAuth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <div className="flex gap-4">
              <Image
                width={32}
                height={32}
                src={session?.user?.image}
                alt={session?.user?.image}
                referrerPolicy="no-referrer"
                className="rounded-[50%]"
              />
              <Link
                href="/account"
                className="transition-colors hover:text-accent-400"
              >
                Guest area
              </Link>
            </div>
          ) : (
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
