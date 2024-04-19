import { makeExecutableSchema } from '@graphql-tools/schema'
import type { Jugador } from '@prisma/client'
import type { GraphQLContext } from './context'
import { GraphQLError } from 'graphql'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const typeDefinitions =  `
  type Jugador {
    email: ID!
    nom: String!
    password: String!
  }
  
  type Query {
    Jugador(filterNeedle: String, skip: Int, take: Int): [Jugador!]!
  }
   
  type Mutation {
    postJugador(email: String!, nom: String!, password: String): Jugador!
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
  Query: {
    
    async Jugador(parent: unknown, args: { filterNeedle?: string, skip?: number; take?: number  }, context: GraphQLContext) {
      const where = args.filterNeedle
        ? {
            OR: [
              { email: { contains: args.filterNeedle } },
              { nom: { contains: args.filterNeedle } }
            ]
          }
        : {}
 
      const take = applyTakeConstraints({
        min: 1,
        max: 300000,
        value: args.take ?? 300000
      })

      return context.prisma.jugador.findMany({
        where,
        skip: args.skip,
        take: take
      })
      .catch((err: unknown) => {
        const errorCodi = (err as PrismaClientKnownRequestError).code
        return Promise.reject(
            new GraphQLError(`Error code '${errorCodi}'.`))})}
  },
  Mutation: {
    async postJugador(
      parent: unknown,
      args: { email: string; nom: string, password: string},
      context: GraphQLContext
    ) 
    {
      const nouJugador = await context.prisma.jugador.create({
        data: {
          email: args.email,
          nom: args.nom,
          password: args.password
        }
      }).catch((err: unknown) => {
        const errorCodi = (err as PrismaClientKnownRequestError).code
        return Promise.reject(
            new GraphQLError(`Error code '${errorCodi}'.`))
      }
    )

      return nouJugador
    }    
  }
}
 
export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions]
})