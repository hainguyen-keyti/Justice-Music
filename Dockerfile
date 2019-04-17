FROM node:latest
MAINTAINER Hoang-Hai <hainh9939@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install npm@3
RUN npm install

COPY . /usr/src/app

EXPOSE 3030

CMD [ "npm", "start" ]
