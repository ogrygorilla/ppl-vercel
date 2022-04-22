import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";

import { firestore, fromMillis, promiseToJSON } from "../lib/firebase";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { useRouter } from "next/router";
import PromiseFeed from "../components/PromiseFeed";
import ContentCreator from "../components/ContentCreator";
import PromiseCard from "../components/PromiseCard";
import Link from "next/link";

// Max promise to query per page
const LIMIT = 3;

//Immer aktueller Inhalt, viele Abfragen
// export async function getServerSideProps(context) {
//   const promiseQuery = firestore
//     .collectionGroup("promises")
//     .where("published", "==", true)
//     .orderBy("createdAt", "desc")
//     .limit(LIMIT);

//   const promises = (await promiseQuery.get()).docs.map(promiseToJSON);

//   return {
//     props: { promises }, // will be passed to the page component as props
//   };
// }

export default function Home(props) {
  const [promises, setPromises] = useState(props.promises);
  const [loading, setLoading] = useState(false);

  const [promiseEnd, setpromiseEnd] = useState(false);

  const [creator, setCreator] = useState("marius");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  // Search Creator

  const getMorePromises = async () => {
    setLoading(true);
    const last = promises[promises.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("promises")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPromises = (await query.get()).docs.map((doc) => doc.data());

    setPromises(promises.concat(newPromises));
    setLoading(false);

    if (newPromises.length < LIMIT) {
      setpromiseEnd(true);
    }
  };

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  // const checkUsername = useCallback(
  //   debounce(async (creator) => {
  //     if (creator.length >= 3) {
  //       const ref = firestore.doc(`usernames/${creator}`);
  //       const { exists } = await ref.get();
  //       console.log("Firestore read executed!");
  //       setIsValid(exists);
  //       setLoading(false);
  //     }
  //   }, 700),
  //   []
  // );

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  const handleSubmit = preventDefault(() => {
    // checkUsername(creator);
    const path = "/" + creator;
    // if (isValid) {
    router.push({
      pathname: path,
      //query: { q: query },
    });
    // }
    //
  });

  return (
    <Layout title={"Home"}>
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
              <Link href={"/marius"}>
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
            <h1 className="mb-4 mt-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:text-4xl">
              Unsere aktuellen Partner
            </h1>
            <div>
              <ContentCreator name={"Jese Leos"} joined={"April 2022"} />
            </div>
            <div className="mt-4">
              <ContentCreator name={"Adrian Heitmann"} joined={"April 2021"} />
            </div>
            <div className="mt-4">
              <ContentCreator name={"Alex"} joined={"November 2021"} />
            </div>
          </div>
          <div className="w-full flex flex-col ">
            <h1 className="mb-4 mt-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:text-4xl">
              Beliebter Gutschein
            </h1>
            <div className="mb-40 h-[200px] max-w-[400px] w-full bg-blue-100 self-start justify-self-start flex flex-col">
              <div className="hover:shadow-lg bg-white h-[250px] max-w-[400px] w-full overflow-hidden cursor-pointer justify-self-center transition-all rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.3)] ml-3 mb-3">
                <div className="space-y-1 text-xl font-medium dark:text-white text-center mt-4 flex flex-col">
                  <div>Spiel wählen</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Wähle das Spiel eines Streams aus
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    @Adrian
                  </div>
                </div>
              </div>
              {/* <PromiseCard
              promiseVal={{
                title: "Spiel wählen",
                content: "Wähle das Spiel eines Streams aus",
                username: "@Adrian",
              }}
              disabled={true}
            /> */}
            </div>
          </div>
        </div>
      </main>
      {/* --Promise Feed-- */}
      {/* <main>
        <h1 className="mb-4 mt-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:text-5xl">
          Top Promises
        </h1>
        <PromiseFeed promises={promises} admin={undefined} />

        {!loading && !promiseEnd && (
          <button onClick={getMorePromises}>Load more</button>
        )}

        <Loader show={loading} />

        {promiseEnd && "You have reached the end!"}
      </main> */}
    </Layout>
  );
}
