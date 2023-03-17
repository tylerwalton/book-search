const {gql} = require ('apollo-server-express')

const typeDefs = gql`
type User {
    _id : ID 
    username : String
    email : String 
    password : String
    savedBooks : [Book]
}

type Book {
    authors : [String]
    description : String
    bookId : ID
    image : String
    link : String
    title : String
}
type Auth {
    token : ID
    user : User
}


type Query {
    me : User 
}
type Mutation {
    
}
`