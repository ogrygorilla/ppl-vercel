import React, { useContext, useState } from "react";
import Link from "next/link";
import { UserContext } from "../lib/context";
import { firestore } from "../lib/firebase";
import Loader from "./Loader";

export default function PromiseCard({ content, disabled }) {
  const { user } = useContext(UserContext);

  const [star, setStar] = useState(content.owner);
  const [loading, setLoading] = useState(false);

  const onReserve = async (e) => {
    setLoading(true);
    e.preventDefault();

    //if user set = do nothing
    if (star == "" || star === user.uid) {
      const promiseRef = firestore.doc(
        `users/${content.uid}/promises/${content.slug}`
      );

      const batch = firestore.batch();

      if (star === user.uid) {
        //Update the owner of the promise
        batch.update(promiseRef, { owner: "" });
        setStar("");
      } else {
        //Update the owner of the promise
        batch.update(promiseRef, { owner: user.uid });
        setStar(user.uid);
      }

      await batch.commit();
    }
    setLoading(false);
  };

  return (
    // <Link href={`/${content.username}/${content.slug}`}>
    <div className="overflow-hidden max-h-64 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:cursor-pointer">
      <div className="flex">
        <h5 className="flex-grow mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {content.title ?? "Testtitel"}
        </h5>
        {loading ? (
          <Loader show={loading} />
        ) : (
          <svg
            className="w-6 h-6 min-h-6 min-w-6 justify-end"
            fill={star == "" ? "none" : "some"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={(e) => onReserve(e)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            ></path>
          </svg>
        )}
        {/* <PromiseCardReserveBtn userId={user.uid} content={content} /> */}
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {content.content ?? "Testinhalt"}
      </p>
      <p className="font-light text-gray-700 dark:text-gray-400 mt-4">
        @{content.username ?? "Testnutzer"}
      </p>
    </div>
    // </Link>
  );
}
