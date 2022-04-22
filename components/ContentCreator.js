import React from "react";

export default function ContentCreator({ name, joined }) {
  return (
    <div className="flex items-center space-x-4 hover:bg-blue-100">
      <img
        className="w-10 h-10 rounded-full"
        src="/docs/images/people/profile-picture-5.jpg"
        alt=""
      />
      <div className="space-y-1 font-medium dark:text-white ">
        <div>{name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Beigetreten im {joined}
        </div>
      </div>
    </div>
  );
}
