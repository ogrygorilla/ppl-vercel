import { useEffect, useState } from "react";
import { getUserWithUsername, promiseToJSON } from "../../lib/firebase";
import UserProfile from "../../components/UserProfile";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import PromiseFeed from "../../components/PromiseFeed";
import { useRouter } from "next/router";

//Server side rendering
//Zu jeder Zeit wenn diese Seite angefragt wird, wird eine Anfrage an den Server geschickt
// export async function getServerSideProps({ query }) {
//   const { username } = query;

//   const userDoc = await getUserWithUsername(username);

//   // If no user, short circuit to 404 page
//   if (!userDoc) {
//     return {
//       notFound: true,
//     };
//   }

//   // JSON serializable data
//   let user = null;
//   let promises = null;

//   if (userDoc) {
//     user = userDoc.data();
//     const promisesQuery = userDoc.ref
//       .collection("promises")
//       .where("published", "==", true)
//       .orderBy("createdAt", "desc")
//       .limit(5);
//     promises = (await promisesQuery.get()).docs.map(promiseToJSON);
//   }

//   return {
//     props: { user, promises }, // will be passed to the page component as props
//   };
// }

//todo complete this function
export async function getServerSideProps({ query }) {
  const { username } = query;

  let user = null;
  // fetch(`https://api.twitch.tv/helix/users/?login=${username}`, {
  //   headers: {
  //     Authorization: "Bearer 05g9fpizwuyulw71p7mzx3jlezn30n",
  //     "Client-Id": "u6u44epveer081p4xte3h4q2tuifcl",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     user = data;
  //   });

  return {
    props: { user }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, promises }) {
  //Twitch Api Anfang (clr)
  const [data, setData] = useState(null);
  const [moreData, setMoreData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  // const { login } = router.query;
  const { username } = router.query;

  const fetchData = (url) => {
    return fetch(url, {
      headers: {
        Authorization: "Bearer 05g9fpizwuyulw71p7mzx3jlezn30n",
        "Client-Id": "u6u44epveer081p4xte3h4q2tuifcl",
      },
    });
  };

  useEffect(() => {
    setLoading(true);

    if (data == null) {
      fetchData(`https://api.twitch.tv/helix/users/?login=${username}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }

    //* Get more data about streamer
    // if (data != null && moreData == null) {
    //   fetchData(
    //     `https://api.twitch.tv/helix/streams?user_id=${data.data[0].id}`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setMoreData(data);
    //       setLoading(false);
    //     });
    // }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (!data || !moreData) return <p>No profile data</p>;

  const userData = data.data[0];
  const moreUserData = moreData.data[0];
  //twitch api ende

  return (
    <Layout title={"Profile"}>
      <Hero title={"Profile"} starter={false} child={undefined} />
      <UserProfile userImg={userData.profile_image_url} />
      <main>
        <div className="mt-16 mb-8 text-center">
          <p>
            <i>@{userData.display_name}</i>
          </p>
          {/* <h1>{user.displayName || "Anonymous User"}</h1> */}
          <p className="mt-4">{userData.description}</p>
          <p className="mt-4">Typ: {userData.broadcaster_type}</p>
          {/* <p>Sprache: {moreUserData.language}</p> */}
        </div>
        <hr />
        <h1 className="m-8 text-2xl sm:text-4xl text-center">
          Wähle einen Gutschein aus
        </h1>
        <PromiseFeed promises={promises} admin={true} />
      </main>
    </Layout>
  );
}
