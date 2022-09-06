FROM node:lastest as node

WORKDIR /Angular

COPY ./ /Angular/

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=node /Angular/dist /usr/share/nginx