import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <div class="mr-6 mb-2 flex flex-shrink-0 items-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent sm:text-5xl">
          <Link href={"/"}>
            <span class="text-xl font-semibold tracking-tight">Populend</span>
          </Link>
        </div>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <div class=" push-left mr-6 mb-2 flex flex-shrink-0 items-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent sm:text-5xl">
              <Link href={"/"}>
                <span class="text-xl font-semibold tracking-tight">
                  Create Promise
                </span>
              </Link>
            </div>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
