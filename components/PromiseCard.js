import React from "react";
import Link from "next/link";

export default function PromiseCard({ promiseVal, disabled }) {
  return (
    <div className="hover:shadow-lg bg-slate-200 h-[400px] max-w-[250px] w-full overflow-hidden cursor-pointer justify-self-center transition-all rounded shadow-[0_8px_30px_rgba(0,0,0,0.3)] m-4">
      {/* <button className="card__save  js-save" type="button">
        <i className="fa  fa-bookmark"></i>
      </button> */}
      <div className="mt-4 h-full flex flex-col">
        <Link href={`/${promiseVal.username}/${promiseVal.slug}`}>
          <h1 className="p-4 whitespace-nowrap overflow-hidden text-ellipsis text-center">
            {promiseVal.title}
          </h1>
        </Link>
        {/* <p className="card__job">astronaut & engineer</p> */}
        <p className="mt-4 text-center font-light">
          {promiseVal.content ?? "das ist eine Beschreibung"}
        </p>
        <Link href={`/${promiseVal.username}`}>
          <p className="mt-12 mb-2 text-sm text-center justify-end">
            {promiseVal.username}
          </p>
        </Link>
        <button
          disabled={disabled}
          className="m-auto rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8"
        >
          20 €
        </button>
      </div>
    </div>
  );
}
