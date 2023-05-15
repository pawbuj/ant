FROM node:16.13.1-alpine3.14

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

RUN npm run build

CMD npm run start