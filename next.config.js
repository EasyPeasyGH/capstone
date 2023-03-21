/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: { domains: ["res.cloudinary.com"] },
  // images: {
  //   loader: "cloudinary",
  //   path: {`https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload`}
  // },
};

module.exports = nextConfig;
