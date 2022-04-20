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
    title: "Test",
    desc: "Das ist ein Beschreibung",
    //username: "streamer",
    price: 10,
  });
  const [step, setstep] = useState(0);

  const steps = ["Title", "Description", "Price"];
  //const [template, settemplate] = useState(true);

  // const title = template ? "Be quick with a template from below" : "Title";
  // const btnTitle = template ? "or Start from scratch" : "Go back";

  return (
    <AuthCheck>
      <Layout title={"Admin"}>
        <Hero
          title={"Create Promise"}
          starter={false}
          child={
            <div>
              <CreateNewPost
                // promiseVal={promiseVal}
                // setPromiseVal={setPromiseVal}
                setPromiseVal={setPromiseVal}
              />
            </div>
          }
        />
        <div className="flex justify-center">
          <PromiseCard promiseVal={promiseVal} disabled={true} />
        </div>
      </Layout>
    </AuthCheck>
  );
}

function CreateNewPost({ setPromiseVal }) {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

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
      title: title ?? "TestTitle",
      slug: slug ?? "test-title",
      uid,
      username,
      published: true,
      content: "Das ist ein Test",
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
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setPromiseVal({ title: e.target.value });
        }}
        placeholder="Promise Title"
        // className={styles.input}
      />
      <button
        type="submit"
        disabled={!isValid}
        className="rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8 mt-2"
      >
        Create New Promise
      </button>
    </form>
  );
}
