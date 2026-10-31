import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db.js";
import { User } from "./user/index.js";
export async function createAppoloGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
        ${User.typedefs}
        type Query {
            ${User.queries}
        }
        type Mutation{
            ${User.mutations}
        }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutations,
            },
        },
    });

    await gqlServer.start()

    return gqlServer;
}

// createUser: async (_, { firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) => {
//     await prismaClient.user.create({
//         data: {
//             email,
//             firstName,
//             lastName,
//             password,
//             salt: ''
//         }
//     })
// }