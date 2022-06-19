import { useContext, useState } from "react";
import { useRouter } from "next/router";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

import AuthCheck from "../../components/AuthCheck";
import { UserContext } from "../../lib/context";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import PromiseCard from "../../components/PromiseCard";
import TailwindNavbar from "../../components/TailwindNavbar";
import TailwindHeader from "../../components/TailwindHeader";
import TailwindInputField from "../../components/TailwindInputField";
import TailwindInputArea from "../../components/TailwindInputArea";
import TailwindPromiseCard from "../../components/TailwindPromiseCard";

/**
 * This is the Admin Page to Create a Promise
 * Only allowed when user has a admin prop
 * @param props
 * @returns
 */
export default function AdminPromisesPage(props) {
  const { username } = useContext(UserContext);

  /**
   * For creating a new Promise these are the default fields
   * Passed to CreateNewPromise Component afterwards
   */
  const [promiseVal, setPromiseVal] = useState({
    title: "Test",
    content: "Das ist ein Beschreibung",
    username: username,
    price: 10,
  });

  return (
    <AuthCheck>
      <div>
        <TailwindNavbar />
        <TailwindHeader
          sectionName="Admin"
          title="Gutschein erstellen"
          subtitle="Erstelle einen Gutschein für deine Fans"
          button={undefined}
        />
        {/* <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-3">
            Erstellen
          </h2>
        </div> */}
        <div className="max-w-7xl sm:px-6 lg:px-8 flex flex-col align-middle justify-center">
          <div className="flex flex-row align-middle justify-center">
            <div>
              <TailwindInputField />
              <TailwindInputArea />
              <button
                type="button"
                className="m-auto mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {}}
              >
                Erstellen
              </button>
            </div>
            <div className="w-16"></div>
            <TailwindPromiseCard />
          </div>
          {/* <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 flex flex-col">
            </div>
          </div> */}
        </div>
      </div>
      {/* <Layout title={"Admin"}>
        <Hero
          title={"Create Promise"}
          child={
            <div>
              <CreateNewPromise
                promiseVal={promiseVal}
                setPromiseVal={setPromiseVal}
              />
            </div>
          }
        />
        <div className="flex justify-center">
          <PromiseCard content={promiseVal} disabled={true} />
        </div>
      </Layout> */}
    </AuthCheck>
  );
}

function CreateNewPromise({ promiseVal, setPromiseVal }) {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new promise in firestore
  const createPromise = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("promises")
      .doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title: title ?? "TestTitle",
      slug: slug ?? "test-title",
      uid,
      username,
      published: true,
      content: content ?? "TestContent",
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
    <div className="flex flex-col">
      <div className="flex-grow mr-4">
        <form
          onSubmit={createPromise}
          className="grid md:grid-cols-2 grid-cols-1"
        >
          <div className="md:mr-4">
            <input
              className="mt-4 rounded-lg"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setPromiseVal({ ...promiseVal, title: e.target.value });
              }}
              placeholder="Promise Title"
            />
          </div>
          <input
            className="mt-4 rounded-lg"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setPromiseVal({ ...promiseVal, content: e.target.value });
            }}
            placeholder="Promise Content"
          />
          <input type="submit" hidden />
        </form>
      </div>
      <div className="">
        <button
          type="submit"
          disabled={!isValid}
          className="m-auto mt-4 rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8"
        >
          Create New Promise
        </button>
      </div>
    </div>
  );
}
