FROM node:20.8.0

WORKDIR /react-app

COPY . ./

RUN npm i yarn -g --force
RUN yarn install

CMD ["yarn", "run", "start"]
