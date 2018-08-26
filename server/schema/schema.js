const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// TODO: Dummy Data

let books = [
    {name: 'Test Book', genre: 'Fantasy', id: '1', authorId: '123'},
    {name: 'Test Book2', genre: 'Action', id: '2', authorId: '2324'},
    {name: 'Test Book3', genre: 'Horror', id: '3', authorId: '343'},
    {name: 'Test Book4', genre: 'Fantasy', id: '4', authorId: '123'},
    {name: 'Test Book5', genre: 'Action', id: '5', authorId: '123'},
    {name: 'Test Book6', genre: 'Horror', id: '6', authorId: '343'}

];

let authors = [
    {name: 'Test Author', age: 23, id: '123'},
    {name: 'Test Author2', age: 45, id: '2324'},
    {name: 'Test Author3', age: 65, id: '343'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                let author = authors.find(a => {
                    return a.id === parent.authorId;
                });
                return author;
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                let booksArray = books.filter(b => {
                    return b.authorId === parent.id;
                });
                return booksArray;
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //TODO: Code to get book from db/store
                let book = books.find(book => {
                    return book.id === args.id
                });
                return book;
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // TODO: //Code to get author from db
                let author = authors.find(a => {
                    return a.id === args.id
                });
                return author;
            }
        }
    }
}); 

module.exports = new GraphQLSchema({
    query: RootQuery
});