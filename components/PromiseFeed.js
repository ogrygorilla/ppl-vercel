import Link from "next/link";
import PromiseList from "./PromiseList";
import PromiseCard from "./PromiseCard";

export default function PromiseFeed({ promises, admin = false }) {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 justify-center">
      {promises
        ? promises.map((promise, idx) => (
            <div className="flex flex-col">
              <div className="m-4">
                <PromiseCard content={promise} disabled={promise == null} />
                {admin && (
                  <Link href={`/admin/${promise.slug}`}>
                    <h3>
                      <button className="mt-4 m-auto rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl px-8">
                        Edit
                      </button>
                    </h3>
                  </Link>
                )}
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
