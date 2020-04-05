FROM node:10

WORKDIR /usr/app

COPY package*.json ./

RUN npm intall

COPY . .

CMD ["npm", "start"]