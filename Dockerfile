FROM node:alpine

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . .

CMD ["yarn", "start"]