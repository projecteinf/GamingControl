import { makeExecutableSchema } from '@graphql-tools/schema'
import type { GraphQLContext } from './context'
import { GraphQLError } from 'graphql'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'


 
export const schema = makeExecutableSchema({
  resolvers: [],
  typeDefs: []
})