FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.23.3-alpine

COPY --from=build /usr/src/app/public /usr/share/nginx/html
