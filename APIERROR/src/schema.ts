import { makeExecutableSchema } from '@graphql-tools/schema'

const typeDefinitions =  `
  type ErrorApp {
    uid: ID!
    code: Int!
    date: DateTime!
    category: String!
    message: String!
    name: String!
    url: String!
    user: String!
  }
  
  type Query {
    ErrorApp(filterNeedle: String, skip: Int, take: Int): [ErrorApp!]!
  }
   
  type Mutation {
    create(code: ID!, category: String!, url: String!, user: String): ErrorApp!
  }
`
 
export const schema = makeExecutableSchema({
  resolvers: [],
  typeDefs: [typeDefinitions]
})

export default schema