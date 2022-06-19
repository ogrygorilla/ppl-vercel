import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <div className="mr-6 mb-2 flex flex-shrink-0 items-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent sm:text-5xl">
          <Link href={"/"}>
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
              Populend
            </h2>
          </Link>
        </div>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <div className=" push-left mr-6 mb-2 flex flex-shrink-0 items-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent sm:text-5xl">
              <Link href={"/admin"}>
                <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                  Create Promise
                </h2>
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
          <div className="mr-6 mb-2 flex flex-shrink-0 items-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent sm:text-5xl">
            <Link href={"/enter"}>
              <span className="hover:cursor-pointer text-xl font-semibold tracking-tight">
                Login
              </span>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
