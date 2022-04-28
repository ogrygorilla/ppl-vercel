import React from "react";
import Link from "next/link";

export default function TextFormField({ handleSubmit, linkTo, setX }) {
  return (
    <div className="flex">
      <div className="flex-grow mr-4">
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setX(e.target.value.toLowerCase())}
            placeholder="Creator suchen"
            className="mt-4 rounded-lg"
          />
          <input type="submit" hidden />
        </form>
      </div>
      <div className="">
        <Link href={`/${linkTo}`}>
          <button className="m-auto mt-4 rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8">
            Suche
            <svg
              className="w-6 h-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
