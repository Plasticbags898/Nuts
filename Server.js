require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const target = process.env.TARGET_URL || 'https://www.google.com'; // Change as needed

app.use('/', createProxyMiddleware({
    target,
    changeOrigin: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': target,
    },
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('X-Forwarded-For', '');
    }
}));

app.listen(3000, () => {
    console.log('Stealth Proxy Running on Port 3000');
});
