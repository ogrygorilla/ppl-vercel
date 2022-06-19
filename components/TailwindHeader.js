/* This example requires Tailwind CSS v2.0+ */
export default function TailwindHeader({
  sectionName,
  title,
  subtitle,
  button = false,
}) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            {sectionName}
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {title}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            {subtitle}
          </p>
          {button ?? (
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 mt-5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Jetzt entdecken
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
