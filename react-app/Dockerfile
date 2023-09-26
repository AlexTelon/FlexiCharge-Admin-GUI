FROM node:boron

WORKDIR /react-app

COPY . ./
RUN npm i npm
RUN mv node_modules/npm /usr/local/lib/node_modules/npm
RUN rm -rf /usr/local/lib/node_modules/npm
RUN npm i yarn -g --force
RUN yarn install

CMD ["yarn", "run", "start"]