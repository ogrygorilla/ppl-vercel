import React from "react";
import Link from "next/link";

export default function Hero({ title, child }) {
  return (
    <div className="h-80 bg-blue-100">
      <main className="flex h-full flex-col justify-center bg-blue-100 text-center">
        <h1 className="mb-2 mt-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:text-5xl">
          {title}
        </h1>
        {child}
      </main>
    </div>
  );
}
