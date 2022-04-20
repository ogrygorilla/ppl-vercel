import { collection, serverTimestamp } from "firebase/firestore";
import { useCollectionDataOnce } from "react-firehooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { auth, firestore } from "../../lib/firebase";
import AuthCheck from "../../components/AuthCheck";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <Layout title={undefined}>
        <PostManager />
      </Layout>
    </AuthCheck>
  );
}

function PostManager() {
  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc(slug.toString());

  const [posts, loading, error] = useCollectionDataOnce(
    collection(firestore, "users", auth.currentUser.uid, "posts")
  );

  const post = posts ? posts.filter((el) => el.slug === slug) : null;

  console.log(post);
  return (
    <main className="container">
      {post && (
        <>
          <section>
            <h1>{post[0].title}</h1>
            <p>ID: {post[0].slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post[0]}
              // preview={undefined} // preview={preview}
            />
          </section>

          {/* <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside> */}
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef }) {
  const router = useRouter();
  //Register user input into the hook
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success("Post updated successfully!");
  };

  const deletePost = async () => {
    await postRef.delete();

    toast.success("Promise deleted!");

    // Imperative navigation after doc is set
    router.push(`/`);
  };

  const onSubmit = (data) => alert(JSON.stringify(data));

  const handleSubmitDraft = (e) => {
    e.preventDefault();
    handleSubmit(deletePost);
  };
  // const handleSubmitPreview=()=>{
  //   handleSubmit((data)=>{...})()
  // }

  return (
    <>
      <form onSubmit={handleSubmit(updatePost)}>
        <div>
          {/* <textarea name="content" ref={register}></textarea> */}
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
      <form onSubmit={handleSubmit(deletePost)}>
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
