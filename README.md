# GamingControl

git clone git@github.com:projecteinf/GamingControl.git
cd GamingControl/
npm init -y
npm i -D --save-exact typescript @types/node ts-node ts-node-dev cross-env
npx tsc --init
npm i @graphql-tools/schema graphql
npm i --save-exact graphql-yoga

mkdir src
echo 'console.log("Hello World!")' > src/main.ts

touch src/schema.ts

echo "import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefinitions =  \`
  type Query { 
    hello: String! 
  }\`

  
const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions]
})

" > src/schema.ts


echo "
import { execute, parse } from 'graphql'
import { schema } from './schema'
 
async function main() {
  const myQuery = parse( \`
    query {
      hello
    }
  \`)
 
  const result = await execute({
    schema,
    document: myQuery
  })
 
  console.log(result)
}
 
main()
" > src/main.ts


