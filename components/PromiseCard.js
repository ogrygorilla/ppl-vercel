import React from "react";

export default function PromiseCard({ promiseVal }) {
  return (
    <div className="card rounded-lg bg-blue-100 hover:shadow-lg">
      <button className="card__save  js-save" type="button">
        <i className="fa  fa-bookmark"></i>
      </button>
      <div className="card__body">
        <h1 className="whitespace-nowrap overflow-hidden text-ellipsis">
          {promiseVal.title}
        </h1>
        {/* <p className="card__job">astronaut & engineer</p> */}
        <p className="card__bio"> {promiseVal.desc}</p>
      </div>
      <p className="mt-12 mb-2 text-sm text-center">{promiseVal.username}</p>
    </div>
  );
}
