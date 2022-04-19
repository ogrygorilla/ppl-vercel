import PostFeed from "../components/PostFeed";
import Loader from "../components/Loader";
import { firestore, fromMillis, postToJSON } from "../lib/firebase";

import { useState } from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";

// Max post to query per page
const LIMIT = 4;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [creator, setCreator] = useState("");
  const [postsEnd, setPostsEnd] = useState(false);

  // Validate length
  const isValid = creator.length > 3 && creator.length < 30;

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <Layout title={"Home"}>
      <Hero
        title={"Search your Content Creator"}
        starter={false}
        child={
          <form onSubmit={() => {}}>
            <input
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              placeholder="Search Creator"
              className="mt-2"
            />
          </form>
        }
      />
      <main>
        <h1 className="mb-4 mt-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:text-5xl">
          Top Promises
        </h1>
        <PostFeed posts={posts} admin={undefined} />

        {!loading && !postsEnd && (
          <button onClick={getMorePosts}>Load more</button>
        )}

        <Loader show={loading} />

        {postsEnd && "You have reached the end!"}
      </main>
    </Layout>
  );
}
