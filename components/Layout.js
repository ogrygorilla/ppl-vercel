import React from "react";
import Head from "next/head";

import Navbar from "./Navbar";

export default function Layout({ children, title }) {
  return (
    <div>
      <div className="flex min-h-screen flex-col ">
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        {children}
      </div>
    </div>
  );
}
