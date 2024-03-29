import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import UserProfile from "../../components/UserProfile";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import PromiseFeed from "../../components/PromiseFeed";
import TailwindNavbar from "../../components/TailwindNavbar";
import TailwindHeader from "../../components/TailwindHeader";
import TailwindGridList from "../../components/TailwindGridList";
import TailwindFooter from "../../components/TailwindFooter";
import { getUserWithUsername, promiseToJSON } from "../../lib/firebase";

/**
 * Essentially the Profile of the user (ssr)
 * @param query  gets the username from the url
 * @returns props (user, promises) All Promises of the user
 */
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
export async function getInitialProps({ query }) {
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

  /**
   * Runs only once and gets the streamer data from the twitch api
   * Should be in getServerSideProps?
   */
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

    setLoading(false);
  }, [data]);

  if (isLoading || !data) return <p>Loading...</p>;

  const userData = data.data[0];

  let displayName = username;
  let description = "Dieser User ist nicht auf twitch..";

  if (userData) {
    displayName = userData.display_name;
    description = userData.description;
  }

  return (
    <div>
      <TailwindNavbar />
      {/* Costumize the header */}
      <TailwindHeader
        sectionName="Profil"
        title={displayName}
        subtitle={description}
        button={false}
      />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-3">
            Gutscheine
          </h2>
        </div>
        <TailwindGridList />
      </div>
      <TailwindFooter />
    </div>
    // <Layout title={"Profile"}>
    //   <Hero title={"Profile"} child={undefined} />
    //   <UserProfile userImg={userData.profile_image_url} />
    //   {/* TODO Rewrite UserProfile Component */}
    //   <main>
    //     <div className="mt-16 mb-8 text-center">
    //       <p>
    //         <i>@{userData.display_name}</i>
    //       </p>
    //       <p className="mt-4">{userData.description}</p>
    //       <p className="mt-4">Typ: {userData.broadcaster_type}</p>
    //     </div>
    //     <hr />
    //     <h1 className="m-8 text-2xl sm:text-4xl text-center">
    //       Wähle einen Gutschein aus
    //     </h1>
    //     <PromiseFeed promises={promises} admin={true} />
    //   </main>
    // </Layout>
  );
}
