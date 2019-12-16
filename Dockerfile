FROM node:11
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install && npm cache clean -f

COPY . .

EXPOSE 6969


CMD [ "npm", "start" ]