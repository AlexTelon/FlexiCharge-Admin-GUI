FROM node:16-alpine3.11

WORKDIR /react-app

COPY . ./

RUN npm i yarn -g --force
RUN yarn

CMD ["yarn", "run", "start"]