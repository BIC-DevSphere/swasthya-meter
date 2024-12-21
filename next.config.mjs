/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: "assets.aceternity.com",
                protocol: "https",
            },
            {
                hostname: "cdn.discordapp.com",
                protocol: "https",
            },
            {
                hostname: "media.discordapp.net",
                protocol: "https",
            }
        ]
    }
};

export default nextConfig;
