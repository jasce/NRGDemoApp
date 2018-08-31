const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require("./schema/schema");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross origin requests

app.use(cors());

mongoose.connect('mongodb://jascee:test123@ds019996.mlab.com:19996/gql-test')

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema
}));

app.listen(4000, () => {
    console.log("listening on port 4000");
})