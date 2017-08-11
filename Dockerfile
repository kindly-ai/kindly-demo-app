FROM node:latest
WORKDIR /usr/src/app
RUN mkdir /code
COPY . /code/
WORKDIR /code
RUN npm install
CMD ["npm", "start"]
