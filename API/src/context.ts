import { PrismaClient } from '@prisma/client'
 
const prisma = new PrismaClient()
 
export type GraphQLContext = {
  prisma: PrismaClient
}
 
export function createContext(): GraphQLContext {
  return { prisma }
}


export async function up() {
  // Connectem amb la base de dades
  await prisma.$connect();
  
  try {
    // Connectem amb la base de dades
    await prisma.$connect();

    // Afegim un registre a la taula Jugador
    for (let i = 0; i < 10000; i++) {
      const nouJugador = await prisma.jugador.create({
        data: {
          nom: `Jugador N ${i}`,
          email: `Email N ${i}`,
      }});
      console.log('Registre afegit:', nouJugador);
    }
  } 
  catch (error) { 
    console.error('Error afegint registre:', error);  
  } 
  finally 
  {
      // Tanquem la connexió amb la base de dades
      await prisma.$disconnect();
  }
}


async function main() {
  try {
    // Connectem amb la base de dades
    await prisma.$connect();

    // Afegim un registre a la taula Jugador
    for (let i = 0; i < 100000; i++) {
      const nouJugador = await prisma.jugador.create({
        data: {
          nom: `Jugador AA ${i}`,
          email: `Email AA ${i}`,
      },
    });
  }} catch (error) { console.error('Error afegint registre:', error);  } finally {
    // Tanquem la connexió amb la base de dades
    await prisma.$disconnect();
  }
}

main();