import { getUserWithUsername, promiseToJSON } from "../../lib/firebase";
import UserProfile from "../../components/UserProfile";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import PromiseFeed from "../../components/PromiseFeed";

//Server side rendering
//Zu jeder Zeit wenn diese Seite angefragt wird, wird eine Anfrage an den Server geschickt
export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let promises = null;

  if (userDoc) {
    user = userDoc.data();
    const promisesQuery = userDoc.ref
      .collection("promises")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
    promises = (await promisesQuery.get()).docs.map(promiseToJSON);
  }

  return {
    props: { user, promises }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, promises }) {
  return (
    <Layout title={"Profile"}>
      <Hero title={"Profile"} starter={false} child={undefined} />
      <UserProfile user={user} />
      <main>
        <div className="mt-16 mb-8 text-center">
          <p>
            <i>@{user.username}</i>
          </p>
          <h1>{user.displayName || "Anonymous User"}</h1>
        </div>
        <hr />
        <h1 className="m-8 text-2xl sm:text-4xl text-center">
          Wähle einen Gutschein aus
        </h1>
        <PromiseFeed promises={promises} admin={undefined} />
      </main>
    </Layout>
  );
}
