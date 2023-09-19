FROM node:16-alpine3.11

COPY . ./

#WORKDIR react-app

RUN npm i yarn -g --force
RUN yarn

#CMD ["ls", "./src", "./src/assets"]
CMD ["yarn", "run", "start"]