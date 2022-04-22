import Layout from "../components/Layout";
import Hero from "../components/Hero";

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Landing.module.css";
import useScript from "../lib/hooks";
import Tilt from "react-tilt";
import PromiseCard from "../components/PromiseCard";
import Footer from "../components/footer";

export default function Landing(props) {
  return (
    <>
      <Layout title={"Welcome"}>
        <Hero
          title={"Suche einen Content Creator"}
          starter={false}
          child={
            <div className="flex">
              <div className="flex-grow mr-4">
                <form onSubmit={() => {}}>
                  <input
                    // onChange={(e) => setCreator(e.target.value.toLowerCase())}
                    placeholder="Creator suchen"
                    className="mt-4 rounded-lg"
                  />
                  <input type="submit" hidden />
                </form>
              </div>
              <div className="">
                <Link href={"/"}>
                  <button className="m-auto mt-4 rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8">
                    Suche
                  </button>
                </Link>
              </div>
            </div>
          }
        />
        <main className="flex flex-grow">
          <div className="grid sm:grid-cols-2 w-full">
            <div className="w-full">
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Tilt
                  className="Tilt"
                  options={{ reverse: true }}
                  style={{ height: "90%", width: "95%" }}
                >
                  <Image
                    alt="Gutschein"
                    src={"/images/image_landing_placeholder.jpeg"}
                    layout="fill"
                    objectFit="contain"
                  />
                </Tilt>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center">
              <h1 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-3xl md:text-4xl lg:text-5xl">
                Handelbare Gutscheine von deinen Creatorn
              </h1>
              <div>
                <Link href={"/"}>
                  <button className="m-auto mt-4 rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8">
                    Jetzt entdecken
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </Layout>
      <div className="w-full bg-blue-100">
        <main>
          <div className="h-screen grid grid-cols-4">
            <div className="h-[400px] max-w-[250px] w-full bg-blue-200 self-center justify-self-center rounded-lg">
              <div className="hover:shadow-lg bg-white h-[400px] max-w-[250px] w-full overflow-hidden cursor-pointer justify-self-center transition-all rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.3)] ml-3 mt-3">
                <h1>1</h1>
                <h1>Gutschein suchen</h1>
                <p>Durchsuche die Profile deiner LieblingsstreamerInnen</p>
              </div>
            </div>
            <div className="h-[400px] max-w-[250px] w-full bg-blue-200 self-center justify-self-center">
              <div className="hover:shadow-lg bg-white h-[400px] max-w-[250px] w-full overflow-hidden cursor-pointer justify-self-center transition-all rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.3)] ml-3 mt-3">
                <h1>2</h1>
                <h1>Gutschein erwerben</h1>
                <p>Sicher dir einzigartige Inhalte von Content Creatorn</p>
              </div>
            </div>
            <div className="mt-40 mr-6 h-[400px] max-w-[250px] w-full bg-blue-200 self-center justify-self-end flex flex-col">
              <div className="hover:shadow-lg bg-white h-[400px] max-w-[250px] w-full overflow-hidden cursor-pointer justify-self-center transition-all rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.3)] ml-3 mt-3">
                <h1>3</h1>
                <h1>Gutschein einlösen</h1>
                <p>Genieße die Interaktionen</p>
              </div>
            </div>
            <div className="mb-40 h-[400px] max-w-[250px] w-full bg-blue-200 self-center justify-self-start flex flex-col">
              <div className="hover:shadow-lg bg-white h-[400px] max-w-[250px] w-full overflow-hidden cursor-pointer justify-self-center transition-all rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.3)] ml-3 mt-3">
                <h1>3</h1>
                <h1>Gutschein handeln</h1>
                <p>Verkaufe deine Gutscheine an weitere InteressentInnen</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Hero
        title={"Unser Email-Newsletter"}
        starter={false}
        child={
          <div className="flex">
            <div className="flex-grow mr-4">
              <form onSubmit={() => {}}>
                <input
                  // onChange={(e) => setCreator(e.target.value.toLowerCase())}
                  placeholder="Email-Adresse"
                  className="mt-4 rounded-lg"
                />
                <input type="submit" hidden />
              </form>
            </div>
            <div className="">
              <Link href={"/"}>
                <button className="m-auto mt-4 rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8">
                  Anmelden
                </button>
              </Link>
            </div>
          </div>
        }
      />
      <Footer />
    </>
  );
}
