import { collection, getFirestore, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { useCollectionData, useCollectionDataOnce } from "react-firehooks";
import AuthCheck from "../../components/AuthCheck";
import Layout from "../../components/Layout";
import { auth, firestore } from "../../lib/firebase";

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
  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc("test");

  const [posts, loading, error] = useCollectionDataOnce(
    collection(firestore, "users", auth.currentUser.uid, "posts")
  );

  return (
    <main>
      {posts && (
        <>
          <section>
            <h1>{posts[0].title}</h1>
            <p>ID: {posts[0].slug}</p>

            {/* <PostForm
              postRef={postRef}
              defaultValues={post[0]}
              // preview={preview}
            /> */}
          </section>

          <aside>
            <h3>Tools</h3>
            {/* <button onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link> */}
          </aside>
        </>
      )}
    </main>
  );
}
