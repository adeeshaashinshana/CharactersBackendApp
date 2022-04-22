const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

/***** Import resolver & typeDef *****/
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

/******* Database URL ******/
const databaseURL = "mongodb+srv://TestAdmin:X_A97r!w6.DMgh$@cluster0.9lmfa.mongodb.net/Cluster0?retryWrites=true&w=majority";

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app });

    await mongoose.connect(databaseURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log(`🙈 Mongoose Connected`);

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000`)
    );
}

startServer();
