import { makeExecutableSchema } from '@graphql-tools/schema'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { GraphQLError } from 'graphql';
import { GraphQLContext } from './context';
import { GraphQLDateTime } from 'graphql-scalars';

const typeDefinitions =  `
  scalar DateTime

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
const parseIntSafe = (value: string): number | null => {
  if (/^(\d+)$/.test(value)) {
    return parseInt(value, 10)
  }
  return null
}

const applyTakeConstraints = (params: { min: number; max: number; value: number }) => {
  if (params.value < params.min || params.value > params.max) {
    throw new GraphQLError(
      `'take' argument value '${params.value}' is outside the valid range of '${params.min}' to '${params.max}'.`
    )
  }
  return params.value
}


const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    
    async ErrorApp(parent: unknown, args: { filterNeedle?: string, skip?: number; take?: number  }, context: GraphQLContext) {
      const where = args.filterNeedle
        ? {
            OR: [
              { category: { contains: args.filterNeedle } },
              { message: { contains: args.filterNeedle } }
            ]
          }
        : {}
 
      const take = applyTakeConstraints({
        min: 1,
        max: 300000,
        value: args.take ?? 300000
      })

      return context.prisma.errorApp.findMany({
        where,
        skip: args.skip,
        take: take
      })
      .catch((err: unknown) => {
        const errorCodi = (err as PrismaClientKnownRequestError).code
        return Promise.reject(
            new GraphQLError(`Error code '${errorCodi}'.`))})}
  },
}
 
export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions]
})

export default schema