# Kindly Demo App

This is a demo-application by Convertelligence for the purpose of demonstrating how third-party applications can connect to Kindly.

![Screenshot from demo](/screenshot.png)

[View live demo](http://kindly-demo-production.firebaseapp.com) | [Go to Kindly documentation](https://kindly.gitbooks.io/kindly/)

## Setting up application

### Prerequisites

* Docker & docker-compose
* nvm

### Set your env variables

Run `cp .env.default .env` to copy your environment file.

Edit `.env` file. The variables are described below:

`PORT=5000` is the port which the demo application server will use (leave as is)  
`MONGODB_URI=mongodb://mongo/test` is a pointer to mongodb running in docker (leave as is)  
`APP_HOST=http://localhost:5000` is a pointer to the demo application running in docker (leave as is)  
`KINDLY_API_HOST=https://bot.kindly.ai` is the pointer to the Kindly API (leave as is)  
`KINDLY_API_KEY=YOUR_API_KEY` **must** be changed to your API KEY  

## Starting application

1. Open two terminal windows/tabs.  
2. Run `docker-compose up` in terminal window #1. This starts MongoDB and Node js server.  
3. Run `nvm use` in terminal window #2 to set the required node version.  
4. Run `npm install` in terminal window #2 to install required packages.
5. Run `npm start` in terminal window #2. This starts the webpack-dev-server.  
6. Visit [http://localhost:8080](http://localhost:8080).  
