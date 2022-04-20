import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";

import { firestore, fromMillis, promiseToJSON } from "../lib/firebase";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { useRouter } from "next/router";
import PromiseFeed from "../components/PromiseFeed";

// Max promise to query per page
const LIMIT = 3;

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
        title={"Search your Content Creator"}
        starter={false}
        child={
          <form onSubmit={handleSubmit}>
            <input
              value={creator}
              onChange={(e) => setCreator(e.target.value.toLowerCase())}
              placeholder="Search Creator"
              className="mt-2"
            />
            <input type="submit" hidden />
          </form>
        }
      />
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
