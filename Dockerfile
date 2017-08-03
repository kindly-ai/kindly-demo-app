# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:latest
WORKDIR /usr/src/app
RUN mkdir /code
COPY . /code/
WORKDIR /code
RUN npm install --global nodemon
RUN npm install

CMD ["nodemon", "-L", "/usr/src/bin/www"]
