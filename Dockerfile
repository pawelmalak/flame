FROM node:14-alpine as builder

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

FROM node:14-alpine

COPY --from=builder /app /app

WORKDIR /app

EXPOSE 5005

ENV NODE_ENV=production

CMD ["node", "server.js"]
