FROM node:14-alpine

RUN apk update && apk add --no-cache nano curl

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN mkdir -p ./public ./data \
    && cd ./client \
    && npm install --production \
    && npm run build \
    && cd .. \
    && mv ./client/build/* ./public \
    && rm -rf ./client

EXPOSE 5005

ENV NODE_ENV=production

CMD ["node", "server.js"]
