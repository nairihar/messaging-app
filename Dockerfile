FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

COPY app ./app
COPY index.ts ./index.ts

RUN npm install

RUN npm run build
