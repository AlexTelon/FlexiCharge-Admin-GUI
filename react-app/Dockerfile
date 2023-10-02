FROM buildpack-deps:bookworm

WORKDIR /react-app

COPY . ./
RUN npm i yarn -g --force
RUN yarn install

CMD ["yarn", "run", "start"]

