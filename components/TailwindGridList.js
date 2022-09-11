/* This example requires Tailwind CSS v2.0+ */
import {
  BookmarkIcon,
  HandIcon,
  MailIcon,
  PhoneIcon,
  SaveIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

const promises = [
  {
    name: "fettarmqp",
    title: "Discord Talk",
    role: "Interaktiv",
    imageUrl:
      "https://images.unsplash.com/photo-1644560286635-d8e1268af76f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Nili_AoE",
    title: "Spiel wählen",
    role: "Zuschauen",
    imageUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=647&q=80",
  },
  {
    name: "Jane Cooper",
    title: "Paradigm Representative",
    role: "Admin",
    imageUrl:
      "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  // More promises...
];

export default function Example() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
    >
      {promises.map((promise, idx) => (
        <li
          key={idx}
          className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="flex-1 flex flex-col p-8">
            <img
              className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
              src={promise.imageUrl}
              alt=""
            />
            <h3 className="mt-6 text-gray-900 text-sm font-medium">
              {promise.name}
            </h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-gray-500 text-sm">{promise.title}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {promise.role}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                <a className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                  <BookmarkIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Merken</span>
                </a>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                <Link href={`/checkout`}>
                  <a className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                    <HandIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Kaufen</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
