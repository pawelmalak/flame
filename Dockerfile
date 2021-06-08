FROM node:14-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

RUN mkdir -p ./public ./data \
    && cd ./client \
    && npm run build \
    && cd .. \
    && mv ./client/build/* ./public \
    && rm -rf ./client

EXPOSE 5005

ENV NODE_ENV=production

CMD ["node", "server.js"]