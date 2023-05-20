/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/start",
        permanent: true,
      },
    ];
  }
}

module.exports = nextConfig
