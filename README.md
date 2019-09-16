[![Build Status](https://travis-ci.org/zinovik/telegram-salesforce-connector.svg?branch=master)](https://travis-ci.org/zinovik/telegram-salesforce-connector)
[![Netlify Status](https://api.netlify.com/api/v1/badges/127fe29a-19d4-4279-9ab0-326b338b4fd9/deploy-status)](https://app.netlify.com/sites/telegram-salesforce-connector/deploys)

**working**

1. start project

```bash
docker-compose up
```

or

```bash
npm run start:lambda
```

2. setup bot

```bash
 curl https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://telegram-salesforce-connector.netlify.com/.netlify/functions/index
```

**testing**

```bash
 curl https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<NGROK ID>.ngrok.io/index
~/ngrok http 9000
```
