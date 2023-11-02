/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    SEPOLIA_PRIVATE_KEY: process.env.SEPOLIA_PRIVATE_KEY,
    SEPOLIA_URL : process.env.SEPOLIA_URL,
    INFURA_API_KEY: process.env.INFURA_API_KEY,
    INFURA_PROJECT_ID : process.env.INFURA_PROJECT_ID,
    IPFS_DEDICATED_SUBDOMAIN: process.env.IPFS_DEDICATED_SUBDOMAIN,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
  }
};

module.exports = nextConfig;
