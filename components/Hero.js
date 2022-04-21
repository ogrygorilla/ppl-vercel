import React from "react";
import Link from "next/link";

export default function Hero({ title, starter, child }) {
  return (
    <div className="h-80 bg-blue-100">
      <main
        className="flex h-full flex-col justify-center bg-blue-100 text-center"
        // style="background-image: url('https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=702&q=80'); background-size: cover"
      >
        <h1 className="mb-2 mt-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:text-5xl">
          {title}
        </h1>
        {child}
        {/* 
        <p className="text-1xl mb-8 text-gray-700 sm:text-lg">
          This is a demo!
        </p> */}
        {starter ? (
          <div className="space-x-2">
            <Link href={"/profile"}>
              <button className="mb-2 rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8">
                Get started
              </button>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}
