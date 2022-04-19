// import styles from "../../styles/Admin.module.css";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/context";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";

import { useContext, useState } from "react";
import { useRouter } from "next/router";

import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import { useDocumentData } from "react-firebase-hooks/firestore";

import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import PromiseCard from "../../components/PromiseCard";

export default function AdminPostsPage(props) {
  const [promiseVal, setPromiseVal] = useState({
    title: "Spiel wählen",
    desc: "Du darfst das Spiel des nächsten Streams wählen",
    username: "streamer",
    price: 10,
  });

  return (
    <AuthCheck>
      <Layout title={"Admin"}>
        <Hero
          title={"Be quick with a template from below"}
          starter={false}
          child={
            // <CreateNewPost
            //   promiseVal={promiseVal}
            //   setPromiseVal={setPromiseVal}
            // />
            <div className="space-x-2 flex justify-center">
              {/* <Link href={"/profile"}> */}
              <button className="mb-2 rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8">
                or Start from scratch
              </button>
              {/* </Link> */}
            </div>
          }
        />
        <main>
          <h1 className="mb-4 mt-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:text-5xl">
            Templates
          </h1>
          {/* <PostFeed posts={posts} admin={undefined} /> */}
          {/* 
        {!loading && !postsEnd && (
          <button onClick={getMorePosts}>Load more</button>
        )}

        <Loader show={loading} />

        {postsEnd && "You have reached the end!"} */}
          <PromiseCard promiseVal={promiseVal} />
        </main>
      </Layout>
    </AuthCheck>
  );
}

function PostList() {
  // const ref = firestore
  //   .collection("users")
  //   .doc(auth.currentUser.uid)
  //   .collection("posts");
  // const query = ref.orderBy("createdAt");
  // const [querySnapshot] = useCollection(query);

  // const posts = querySnapshot?.docs.map((doc) => doc.data());
  return (
    <>
      <h1>Manage your Posts</h1>
      {/* <PostFeed posts={posts} admin /> */}
    </>
  );
}

function CreateNewPost({ promiseVal, setPromiseVal }) {
  const router = useRouter();
  const { username } = useContext(UserContext);

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(promiseVal.title));

  // Validate length
  const isValid = promiseVal.title.length > 3 && promiseVal.title.length < 100;

  //Go to next step
  const checkNext = (e) => {
    e.preventDefault();
  };

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title: promiseVal.title ?? "Test",
      slug,
      uid,
      username,
      published: true,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success("Promise created!");

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={checkNext}>
      <input
        value={promiseVal.title}
        onChange={(e) => setPromiseVal({ title: e.target.value })}
        placeholder="Promise Title"
        // classNameName={styles.input}
      />
      <button
        type="submit"
        disabled={!isValid}
        className="bg-[#60A5FA] text-white"
      >
        Ok
      </button>
    </form>
  );
}
