require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

/****** Import Application ******/
const application = require("./application");
const schema = application.createSchemaForApollo();

/******* Database URL ******/
const databaseURL = process.env.MONGODB_URL;

async function startServer() {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors());

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
  console.log(`🙈 Mongoose Connected`);

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000`)
  );
}

startServer();
