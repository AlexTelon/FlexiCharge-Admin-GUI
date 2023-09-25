FROM node:16-alpine3.11

WORKDIR /react-app

COPY . ./

RUN npm i yarn -g --force
RUN yarn install --network-timeout 1000000

CMD ["yarn", "run", "start"]