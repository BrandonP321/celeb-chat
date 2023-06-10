# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /packages

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY ./packages/server/package.json packages/server/
COPY ./packages/server packages/server

COPY ./packages/shared/package.json packages/shared/
COPY ./packages/shared packages/shared

RUN yarn install

COPY ./packages/server packages/server
COPY ./packages/shared packages/shared

RUN yarn server build

EXPOSE 8000

CMD ["yarn", "server", "start"]