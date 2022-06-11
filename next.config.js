/** @type {import('next').NextConfig} */

require("dotenv").config();

const env = {
  HASURA_API: process.env.HASURA_API,
  HASURA_API_SECRET: process.env.HASURA_API_SECRET,
};

const nextConfig = {
  reactStrictMode: true,
  env: env,
};

module.exports = nextConfig;

