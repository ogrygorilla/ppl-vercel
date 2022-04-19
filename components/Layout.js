import React from "react";

import Footer from "./footer";
import Navbar from "./Navbar";
import Head from "next/head";

export default function Layout({ children, title }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
