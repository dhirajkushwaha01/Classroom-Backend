import express from "express";
import { expressMiddleware } from '@as-integrations/express5';
import { createAppoloGraphqlServer } from "./graphql/index.js";
import { UserServices } from "./services/user.js";
async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json())

    // const gqlServer = new ApolloServer({
    //     typeDefs: `
    //     type Query {
    //     hello: String
    //     say(name: String) : String
    //     }
    //     type Mutation{
    //         createUser(firstName: String!, lastName : String!, email: String!, password: String!) : Boolean
    //     }
    //     `,
    //     resolvers: {
    //         Query: {
    //             hello: () => "hey there, i am a gql server",
    //             say: (_, { name }: { name: string }) => `hey ${name}, how are you`,
    //         },
    //         Mutation: {
    //             createUser: async(_, {firstName, lastName, email, password} : {firstName: string; lastName: string; email:string; password:string}) => {
    //                 await prismaClient.user.create({
    //                     data:{
    //                         email,
    //                         firstName,
    //                         lastName,
    //                         password,
    //                         salt: ''
    //                     }
    //                 })
    //             }
    //         }
    //     }
    // })

    // await gqlServer.start()

    app.get("/", (req, res) => {
        res.send("hello world")
    })

    app.use("/graphql", expressMiddleware(await createAppoloGraphqlServer(), {
        context: async ({ req }) => {
            //@ts-ignore
            const token = req.headers['token']
            try {
                const user = UserServices.decodeJWTToken(token as string);
                return {user};
            } catch (error) {
                return {};
            }
        }
    }))
    app.listen(PORT, () => console.log("running on port 8000"));
}
init()