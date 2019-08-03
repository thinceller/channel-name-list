const url = process.env.NODE_ENV === 'production'
  ? 'https://2q0lrfdamb.execute-api.ap-northeast-1.amazonaws.com/prod'
  : 'https://y9kuo5luf0.execute-api.ap-northeast-1.amazonaws.com/dev';
const config = {
  lambdaEndpoint: url,
};

export default config;
