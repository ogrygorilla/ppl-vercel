// import styles from "../../styles/Post.module.css";
// import PostContent from "../../components/PostContent";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Link from "next/link";
import AuthCheck from "../../components/AuthCheck";
import HeartButton from "../../components/HeartButton";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: "blocking",
  };
}
export default function Post(props) {
  const postRef = firestore.doc(props.path);

  console.log(props.post);
  // const [realtimePost] = useDocumentData(postRef);

  const post = props.post;

  return (
    <>
      {post && (
        <main>
          <section>
            <PostContent post={post} />
          </section>

          <aside>
            <p>
              <strong>{post.heartCount || 0} </strong>
            </p>

            {/* <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck> */}
          </aside>
        </main>
      )}
    </>
  );
}

function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{" "}
        <Link href={`/${post.username}/`}>
          <a className="text-info">@{post.username}</a>
        </Link>{" "}
        on {createdAt.toISOString()}
      </span>
      <p>{post?.content}</p>
      {/* <ReactMarkdown>{post?.content}</ReactMarkdown> */}
    </div>
  );
}
