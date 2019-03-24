const request = require('request');

const data = {
  uri: process.env.WEBHOOK_URL,
  headers: { 'Content-Type': 'application/json' },
  json: {
    channel: 'CFRUD7P7H',
    username: 'デプロイ通知bot',
    icon_emoji: ':tada:',
    text: '@channel デプロイが完了しました！\nhttps://channel-name-list.firebaseapp.com/',
    link_names: 1
  }
};

request.post(data);
