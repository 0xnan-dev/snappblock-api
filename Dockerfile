FROM node:fermium-alpine AS build

# for node-gyp
RUN apk update && apk add yarn python3 g++ make && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn build
COPY src ./src

# ---- remove dev files ---- #
FROM node:fermium-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app ./

CMD npm run start
EXPOSE 3000