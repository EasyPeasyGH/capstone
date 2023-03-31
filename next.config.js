/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: { domains: ["res.cloudinary.com"] },
  // images: {
  //   loader: "cloudinary",
  //   path: {`https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload`}
  // },
  experimental: {
    urlImports: ["https://cdn.skypack.dev"],
  },
};

module.exports = nextConfig;
