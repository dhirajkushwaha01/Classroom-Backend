import { UserServices, type CreateUserPayload } from "../../services/user.js";
const queries = {
    getUserToken: async (_: any, payload: { email: string, password: string }) => {
        const token = await UserServices.getUserToken({
            email: payload.email,
            password: payload.password,
        });
        return token;
    },
    getCurrentLoggedinUser: async (_: any, parameters: any, context: any) => {
        if (context && context.user) {
            console.log(context)
            const id = context.user.id
            const user = await UserServices.getUserById(id)
            return user;
        }
        throw new Error("Unauthenticated: No user context found");
    }
};

const mutations = {
    // ❌ ERROR: async(_: any, {payload}: {payload: CreateUserPayload})
    // GraphQL passes args flat: { firstName, lastName, email, password }
    // Destructuring { payload } made payload = undefined → firstName undefined

    // ✅ FIX: Accept args directly as the second parameter (no nested wrapping)
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserServices.createUser(payload);
        return res.id;
    }
};

// export const resolvers = { queries, mutations };

export const resolvers = { queries, mutations };