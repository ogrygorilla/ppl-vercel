import {
  firestore,
  getUserWithUsername,
  promiseToJSON,
} from "../../lib/firebase";
import PromiseCard from "../../components/PromiseCard";

//todo whats the use of this page?

/**
 *
 * @param param0 {username and slug} get extracted from the url
 * @returns
 */
export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let promise;
  let path;

  if (userDoc) {
    //get the promise with /username/slug
    const promiseRef = userDoc.ref.collection("promises").doc(slug);
    promise = promiseToJSON(await promiseRef.get());

    path = promiseRef.path;
  }

  return {
    props: { promise, path },
    //reload the promise after x Duration for updates
    revalidate: 5000,
  };
}

/**
 *
 * @returns params {username, slug} for the getStaticProps function
 */
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
            {/* Show promise loaded from firestore */}
            <PromiseCard content={promise} disabled={promise == null} />
          </section>
        </main>
      )}
    </>
  );
}
