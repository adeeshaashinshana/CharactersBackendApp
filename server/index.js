require("dotenv").config();
const cron = require("node-cron");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { MongoClient } = require("mongodb");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const Logger = require("../shared/logger");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

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
    Logger.info("==========< Data will refresh after 12 hours >==========");
  } finally {
    await client.close();
  }
}

/******* get all character data from API ******/
async function getAllCharacterData() {
  Logger.info("==========< Fetching data from API...");

  // remove previous array data before fetch data
  allCharacterData.splice(0, allCharacterData.length);

  // fetch total page count from API
  const pageResults = await fetch(characterAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        characters {
          info {
            pages
          }
        }
      }`,
    }),
  });
  const pageInfo = await pageResults.json();

  // fetch all character data from API
  for (
    let pageNo = 1;
    pageNo < pageInfo.data.characters.info.pages + 1;
    pageNo++
  ) {
    const results = await fetch(characterAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          characters(page: ${pageNo}) {
            results {
              id
              image
              name
              species
              gender
              origin {
                name
                dimension
              }
              status
              episode {
                id
                name
                air_date
              }
            }
          }
        }`,
      }),
    });
    const characterData = await results.json();

    allCharacterData.push(...characterData.data.characters.results);
  }

  // rename id as _id for mongoDB collection id
  allCharacterData.forEach((object) => {
    object._id = object.id;
    delete object["id"];
  });

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
    getAllCharacterData();
  });
}

startServer();

// refetch data from API in every 12 hours
cron.schedule(
  "0 */12 * * *",
  () => {
    Logger.info("==========< Data refresh started >==========");
    getAllCharacterData();
  },
  {
    scheduled: true,
  }
);
