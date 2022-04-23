require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { MongoClient } = require("mongodb");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const Logger = require("../shared/logger");

/****** Import Application ******/
const application = require("./application");
const schema = application.createSchemaForApollo();

/******* Database & API URL ******/
const databaseURL = process.env.MONGODB_URL;
const characterAPI = process.env.CHARACTER_API_URL;

const client = new MongoClient(databaseURL);

const allCharacterData = [];

/******* insert all character data into mongoDB ******/
async function handleMongoDB(data) {
  try {
    await client.connect();
    const database = client.db("CharacterDB");
    const characters = database.collection("characters");

    // remove all previous documents in mongoDB collection
    await characters.deleteMany({});
    Logger.info("==========< Removed all previous character data >==========");

    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };

    // insert new documents into mongoDB
    const result = await characters.insertMany(data, options);
    Logger.info(
      `==========< ${result.insertedCount} documents were inserted >==========`
    );
    Logger.info("==========< Data will refresh after 6 hours >==========");
  } finally {
    await client.close();
  }
}

/******* get 1st data set from API ******/
async function getInitialCharacterData() {
  Logger.info("==========< Fetching data from API...");
  await axios
    .get(characterAPI)
    .then((response) => {
      allCharacterData.push(...response.data.results);
      getRemainingCharacterData(response.data.info);
    })
    .catch((error) => {
      Logger.error(error);
    });
}

/******* get other all data from API ******/
async function getRemainingCharacterData(info) {
  for (let pageNo = 2; pageNo < info.pages + 1; pageNo++) {
    await axios
      .get(`${characterAPI}?page=${pageNo}`)
      .then((response) => {
        allCharacterData.push(...response.data.results);
      })
      .catch((error) => {
        Logger.error(error);
      });
  }
  handleMongoDB(allCharacterData);
}

async function startServer() {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors());

  app.use(express.json());

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });

  await mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  Logger.info(`🙈 Mongoose Connected`);

  app.listen({ port: 4000 }, () => {
    Logger.info(`🚀 Server ready at http://localhost:4000`);
    getInitialCharacterData();
  });
}

startServer();
