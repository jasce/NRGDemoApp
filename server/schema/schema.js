const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// TODO: Dummy Data

let books = [
    {name: 'Test Book', genre: 'Fantasy', id: '1'},
    {name: 'Test Book2', genre: 'Action', id: '2'},
    {name: 'Test Book3', genre: 'Horror', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                //TODO: Code to get db/store
                let book = books.find(book => {
                    return book.id === args.id
                });
                return book;
            }
        }
    }
}); 

module.exports = new GraphQLSchema({
    query: RootQuery
});