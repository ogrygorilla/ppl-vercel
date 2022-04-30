/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "static-cdn.jtvnw.net"],
    loader: "akamai",
    path: "",
  },
};
