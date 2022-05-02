import { useState } from "react";
import { useRouter } from "next/router";

import { firestore, fromMillis, promiseToJSON } from "../lib/firebase";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import PromiseFeed from "../components/PromiseFeed";
import TextFormField from "../components/TextFormField";

// Max promise to query per page
const LIMIT = 3;

//Immer aktueller Inhalt, viele Abfragen (ssr)
export async function getServerSideProps(context) {
  const promiseQuery = firestore
    .collectionGroup("promises")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const promises = (await promiseQuery.get()).docs.map(promiseToJSON);

  return {
    props: { promises }, // will be passed to the page component as props
  };
}

/**
 * Homepage with Search and Promises
 * @param props promises loaded from getServerSideProps
 * @returns
 */
export default function Home(props) {
  const [promises, setPromises] = useState(props.promises);
  const [loading, setLoading] = useState(false);
  const [promiseEnd, setpromiseEnd] = useState(false);
  const [creator, setCreator] = useState("");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  /**
   * Load more Button executes this function
   * Hits the db and Loads more Promises (with LIMIT)
   */
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

  /**
   * Search for a creator and go the streamers profile
   */
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
      {/* Hero Section with Search */}
      <Hero
        title={"Suche einen Content Creator"}
        child={
          //* TextFormField Component - Search Creators
          <TextFormField
            handleSubmit={handleSubmit}
            linkTo={creator}
            setX={setCreator}
          />
        }
      />
      {/* //*Promise Feed - Render Promise Cards */}
      <main>
        <h1 className="mb-4 mt-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:text-5xl">
          Top Promises
        </h1>
        <PromiseFeed promises={promises} admin={undefined} />

        {!loading && !promiseEnd && (
          <button onClick={getMorePromises}>Load more</button>
        )}

        <Loader show={loading} />

        {promiseEnd && "You have reached the end!"}
      </main>
    </Layout>
  );
}

/**
 * Currently not in use
 * @returns PartnerAndPromiseSection
 */
function PartnerAndPromiseSection() {
  return (
    <main className="flex flex-grow ">
      <div className="grid sm:grid-cols-2 w-full">
        <div className="w-full">
          <h1 className="mb-4 mt-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:text-4xl">
            Unsere aktuellen Partner
          </h1>
          <div className="">
            <ContentCreator name={"Jese Leos"} joined={"April 2022"} />
          </div>
          <div className="mt-4">
            <ContentCreator name={"Adrian Heitmann"} joined={"April 2021"} />
          </div>
          <div className="mt-4">
            <ContentCreator name={"Alex"} joined={"November 2021"} />
          </div>
        </div>
        <div className="w-full">
          <h1 className="mb-4 mt-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:text-4xl">
            Beliebter Gutschein
          </h1>
          <a
            href="#"
            className="overflow-hidden max-h-64 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="flex">
              <h5 className="flex-grow mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Spiel wählen
              </h5>
              <svg
                className="w-6 h-6 min-h-6 min-w-6 justify-end"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                ></path>
              </svg>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Wähle ein Spiel aus, welches in einem meiner Streams gespielt
              wird.
            </p>
            <p className="font-light text-gray-700 dark:text-gray-400 mt-4">
              @Adrian
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}

function ContentCreator({ name, joined }) {
  return (
    <div className="flex items-center space-x-4 hover:bg-blue-100">
      <img
        className="w-10 h-10 rounded-full"
        src="/docs/images/people/profile-picture-5.jpg"
        alt=""
      />
      <div className="space-y-1 font-medium dark:text-white ">
        <div>{name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Beigetreten im {joined}
        </div>
      </div>
    </div>
  );
}
