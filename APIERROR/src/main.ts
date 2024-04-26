import { createServer } from 'http'
import { createYoga } from 'graphql-yoga'
import { createContext } from './context'
import { schema } from './schema'
 
function main() {
  const yoga = createYoga({ schema, context: createContext })
  const server = createServer(yoga)
  server.listen(4100, () => {
    console.info('Server is running on http://localhost:4100/graphql')
  })
}
 
main()