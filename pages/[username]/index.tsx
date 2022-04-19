import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";

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
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
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
        <PostFeed posts={posts} admin={undefined} />
      </main>
    </Layout>
  );
}
