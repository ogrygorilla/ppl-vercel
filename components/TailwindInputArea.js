/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
  return (
    <div className="mt-6 lg:min-w-[300px]">
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700"
      >
        Inhalt
      </label>
      <div className="mt-1">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md resize-none"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500" id="title-description">
        Beschreibe deinen Gutschein
      </p>
    </div>
  );
}
