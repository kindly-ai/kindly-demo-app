FROM node:latest
RUN mkdir /code
COPY . /code/
WORKDIR /code
RUN npm install
CMD ["npm", "start"]
