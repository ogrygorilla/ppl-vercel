import Link from "next/link";
import PromiseList from "./PromiseList";
import styles from "./PostFeed.module.css";
import PromiseCard from "./PromiseCard";

export default function PromiseFeed({ promises, admin }) {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 justify-center">
      {promises
        ? promises.map((promise) => (
            <div className="flex flex-col">
              <PromiseItem
                promise={promise}
                key={promise.slug}
                admin={admin}
                className="justify-center w-full"
              />
              {admin && (
                <Link href={`/admin/${promise.slug}`}>
                  <h3>
                    <button className=" m-auto rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl px-8">
                      Edit
                    </button>
                  </h3>
                </Link>
              )}
            </div>
          ))
        : null}
    </div>
  );
}

function PromiseItem({ promise, admin = false }) {
  return <PromiseCard promiseVal={promise} admin={admin} />;
}

function PromiseItemAlt({ promise, admin = false }) {
  return (
    <></>
    // <card
    //   // id={el.id}
    //   className="min-h-64 m-4 flex flex-col overflow-hidden rounded-lg bg-blue-50 hover:cursor-pointer hover:shadow-lg"
    //   // onMouseOver={() => onMouseEv(i, true)}
    //   // onMouseLeave={() => onMouseEv(i, false)}
    // >
    //   {/* <a href="#">
    //                 <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">
    //             </a> */}

    //   <h1 className="whitespace-nowrap overflow-hidden text-ellipsis p-5 mb-4">
    //     {post.title}
    //   </h1>
    //   <p className="h-full"></p>
    //   <p className="mt-12 mb-2 text-sm text-center">{post.username}</p>
    //   <div className="flex h-64 justify-center bg-blue-100">
    //     <Link href={`/${post.username}/${post.slug}`}>
    //       <button className="m-auto rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl py-3 px-8">
    //         20 €
    //       </button>
    //     </Link>
    //   </div>
    // </card>
  );
}
// function PostItem({ post, admin = false }) {
//   // Naive method to calc word count and read time
//   const wordCount = post?.content.trim().split(/\s+/g).length;
//   const minutesToRead = (wordCount / 100 + 1).toFixed(0);

//   return (
//     <div className={styles.card}>
//       <Link href={`/${post.username}`}>
//         <a>
//           <strong>By @{post.username}</strong>
//         </a>
//       </Link>

//       <Link href={`/${post.username}/${post.slug}`}>
//         <h2>
//           <a>{post.title}</a>
//         </h2>
//       </Link>

//       {/* <footer>
//         <span>
//           {wordCount} words. {minutesToRead} min read
//         </span>
//         <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
//       </footer> */}

//       {/* If admin view, show extra controls for user */}
//       {admin && (
//         <>
//           <Link href={`/admin/${post.slug}`}>
//             <h3>
//               <button className="btn-blue">Edit</button>
//             </h3>
//           </Link>

//           {post.published ? (
//             <p className="text-success">Live</p>
//           ) : (
//             <p className="text-danger">Unpublished</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
