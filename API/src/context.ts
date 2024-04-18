import { PrismaClient } from '@prisma/client'
 
const prisma = new PrismaClient()
 
export type GraphQLContext = {
  prisma: PrismaClient
}
 
export function createContext(): GraphQLContext {
  return { prisma }
}

async function main() {
  try {
    // Connectem amb la base de dades
    await prisma.$connect();

    // Afegim un registre a la taula Jugador
    const nouJugador = await prisma.jugador.create({
      data: {
        nom: 'Nom del Jugador',
        email: 'exemple@example.com',
        // Altres camps que vulguis afegir
      },
    });

    console.log('Registre afegit:', nouJugador);
  } catch (error) {
    console.error('Error afegint registre:', error);
  } finally {
    // Tanquem la connexió amb la base de dades
    await prisma.$disconnect();
  }
}

main();