/** @type {import('next').NextConfig} */
const nextConfig = {}

import('@cloudflare/next-on-pages/__experimental__next-dev').then(({ setupDevBindings }) => {
    setupDevBindings({
        ai: {
            bindingName: 'AI',
            accountId: process.env.CF_ACCOUNT_ID,
            apiToken: process.env.CF_API_TOKEN,
        }
    });
});

module.exports = nextConfig
