const { ApolloServer, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

// function for our authenticated routes
const authMiddleware = (context) => {
  // allows token to be sent via headers or query parameters
  let token = context.req.headers.authorization || "";

  if (token.startsWith("Bearer ")) {
    // Remove "Bearer " from token string
    token = token.slice(7, token.length);
  }

  if (!token) {
    throw new AuthenticationError("You must be logged in");
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    context.user = data;
  } catch (err) {
    console.log(err);
    throw new AuthenticationError("Invalid token");
  }

  return context;
};

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return authMiddleware({ req });
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
