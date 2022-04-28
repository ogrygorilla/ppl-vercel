// import styles from "../../styles/Post.module.css";
// import PostContent from "../../components/PostContent";
import {
  firestore,
  getUserWithUsername,
  promiseToJSON,
} from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Link from "next/link";
import AuthCheck from "../../components/AuthCheck";
import HeartButton from "../../components/HeartButton";
import PromiseCard from "../../components/PromiseCard";
import PromiseFeed from "../../components/PromiseFeed";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let promise;
  let path;

  if (userDoc) {
    const promiseRef = userDoc.ref.collection("promises").doc(slug);
    promise = promiseToJSON(await promiseRef.get());

    path = promiseRef.path;
  }

  return {
    props: { promise, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup("promises").get();

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
export default function Promise(props) {
  const promiseRef = firestore.doc(props.path);

  // console.log(props.post);
  // const [realtimePost] = useDocumentData(promiseRef);

  const promise = props.promise;
  return (
    <>
      {promise && (
        <main>
          <section>
            <PromiseFeed promises={[promise]} admin />
          </section>
        </main>
      )}
    </>
  );
}

function PromiseContent({ promise }) {
  const createdAt =
    typeof promise?.createdAt === "number"
      ? new Date(promise.createdAt)
      : promise.createdAt.toDate();

  return (
    <div className="card">
      <h1>{promise?.title}</h1>
      <span className="text-sm">
        Written by{" "}
        <Link href={`/${promise.username}/`}>
          <a className="text-info">@{promise.username}</a>
        </Link>{" "}
        on {createdAt.toISOString()}
      </span>
      <p>{promise?.content}</p>
      {/* <ReactMarkdown>{promise?.content}</ReactMarkdown> */}
    </div>
  );
}
