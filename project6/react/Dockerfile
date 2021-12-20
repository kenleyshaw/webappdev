FROM ubuntu:latest


RUN apt update -y && apt install -y curl

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt update -y && apt --yes install -y yarn nodejs

RUN npm install -g create-react-app

ENV PUBLIC_URL /project6

RUN mkdir /app

WORKDIR /app
