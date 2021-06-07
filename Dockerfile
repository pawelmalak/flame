FROM node:14-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

RUN mkdir -p ./public ./data
RUN mv ./client/build/* ./public
RUN rm -rf ./client

EXPOSE 5005

CMD ["node", "server.js"]