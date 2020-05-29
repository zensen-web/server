FROM node:14 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

FROM base AS dev
WORKDIR /usr/src/app
CMD [ "npm", "run", "watch" ]

FROM base AS test
WORKDIR /usr/src/app
CMD [ "npm", "run", "test:watch", "&>test.log" ]

FROM base AS prod
WORKDIR /usr/src/app
RUN npm run build
CMD [ "npm", "run", "start:prod" ]
