const isProd = process.env.NODE_ENV === 'production';

const config = {
    isProd,
    apiPrefix: isProd ? 'https://stellar-store-416210.as.r.appspot.com' : 'http://localhost:1337'
}

export default config;
