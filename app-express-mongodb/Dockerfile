FROM node:10.13.0-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]