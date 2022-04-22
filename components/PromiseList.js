// import React, { useState } from "react";
// import Link from "next/link";
// // import styles from "@styles/Admin.module.css";
// import styles from "./Promise.module.css";

// export default function PromiseList({}) {
//   const [promises, setpromises] = useState([
//     {
//       id: 0,
//       title: "Spiel wählen",
//       desc: "Spiel des nächsten Streams aussuchen",
//       date: "01.04.2022",
//     },
//     {
//       id: 1,
//       title: "Spiel wählen",
//       desc: "Spiel des nächsten Streams aussuchen",
//       date: "01.04.2022",
//     },
//     {
//       id: 2,
//       title: "Spiel wählen",
//       desc: "Spiel des nächsten Streams aussuchen",
//       date: "01.04.2022",
//     },
//   ]);

//   const onMouseEv = (i, onover) => {
//     promises.map((item, index) => {
//       var element = document.getElementById(item.id);
//       if (index != i) {
//         element.classList.add("opacity-50");
//       }

//       if (!onover) {
//         element.classList.remove("opacity-50");
//         return;
//       }
//     });
//   };

//   return (
//     <div class="grid sm:grid-cols-3">
//       {promises.map((el, i) => {
//         return (
//           <Link href={"/promise"}>
//             <card
//               id={el.id}
//               class="test"
//               onMouseOver={() => onMouseEv(i, true)}
//               onMouseLeave={() => onMouseEv(i, false)}
//             >
//               {/* <a href="#">
//                     <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">
//                 </a> */}

//               <h1 class="test">{el.title}</h1>
//               <p class="text-sm">{el.desc}</p>
//               <p class="mt-12 mb-2 text-sm">fettarmqp</p>
//               <div className="flex h-24 justify-center bg-blue-100">
//                 {/* <Link href={'/profile'}> */}
//                 <button className="m-auto rounded-lg bg-yellow-400 p-4 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:shadow-xl sm:py-3 sm:px-8">
//                   20 €
//                 </button>
//                 {/* </Link> */}
//               </div>
//             </card>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

export default function Promise({ post }) {
  return <></>;
}
