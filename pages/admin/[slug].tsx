import { collection, serverTimestamp } from "firebase/firestore";
import { useCollectionDataOnce } from "react-firehooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import { auth, firestore } from "../../lib/firebase";
import AuthCheck from "../../components/AuthCheck";
import Layout from "../../components/Layout";
import TailwindNavbar from "../../components/TailwindNavbar";

/**
 * Here the streamer will edit his promise
 * Only allowed when logged in and admin
 * @param props
 * @returns
 */
export default function AdminPromiseEdit(props) {
  return (
    <AuthCheck>
      {/* <Layout title={undefined}>
        <PromiseManager />
      </Layout> */}
      <TailwindNavbar />
      <PromiseManager />
    </AuthCheck>
  );
}

function PromiseManager() {
  const router = useRouter();
  const { slug } = router.query;

  //todo look into [username]/[slug] for fetching of promise?
  const promiseRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("promises")
    .doc(slug.toString());

  const [promises, loading, error] = useCollectionDataOnce(
    collection(firestore, "users", auth.currentUser.uid, "promises")
  );

  const promise = promises ? promises.filter((el) => el.slug === slug) : null;

  console.log(promise);
  return (
    <main className="container">
      {promise && (
        <>
          <section>
            <h1>{promise[0].title}</h1>
            <p>ID: {promise[0].slug}</p>

            <PromiseForm promiseRef={promiseRef} defaultValues={promise[0]} />
          </section>
        </>
      )}
    </main>
  );
}

function PromiseForm({ defaultValues, promiseRef }) {
  const router = useRouter();
  //Register user input into the hook
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const updatePromise = async ({ content, published }) => {
    await promiseRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success("Promise updated successfully!");
  };

  const deletePromise = async () => {
    await promiseRef.delete();

    toast.success("Promise deleted!");

    // Imperative navigation after doc is set
    router.push(`/`);
  };

  //todo can be the same component like the admin/index (create promise page?)
  return (
    <>
      <form onSubmit={handleSubmit(updatePromise)}>
        <div>
          <input
            {...register("content")}
            placeholder="Description"
            name="content"
          />
          <fieldset>
            <input
              {...register("published")}
              className="checkbox"
              name="published"
              type="checkbox"
            />
            <label>Published</label>
          </fieldset>

          <button
            type="submit"
            className="rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8 mt-2"
          >
            Save Changes
          </button>
        </div>
      </form>
      <form onSubmit={handleSubmit(deletePromise)}>
        <button
          type="submit"
          className="rounded-lg bg-red-400 p-4 py-2 text-white transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8 mt-2"
        >
          Delete Promise
        </button>
      </form>
    </>
  );
}
