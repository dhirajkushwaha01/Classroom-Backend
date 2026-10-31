import { prismaClient } from "../lib/db.js";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

// Ensure JWT_SECRET exists at startup
const secretKey: string = process.env.JWT_SECRET ?? "";
if (!secretKey) {
  throw new Error("FATAL: JWT_SECRET environment variable is missing.");
}

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export class UserServices {

  private static generateHash(salt: string, password: string): string {
    return createHmac('sha256', salt).update(password).digest("hex");
  }

  public static async createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString('hex');
    const hashedPassword = UserServices.generateHash(salt, password);

    return await prismaClient.user.create({
      data: {
        firstName,
        lastName: lastName ?? "",
        email,
        salt,
        password: hashedPassword
      }
    });
  }

  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({where: {id}})
  }

  public static async getUserToken(payload: GetUserTokenPayload): Promise<string> {
    const { email, password } = payload;
    const user = await UserServices.getUserByEmail(email);

    if (!user) throw new Error('User not found');

    const userSalt = user.salt;
    const userHashPassword = UserServices.generateHash(userSalt, password);

    if (userHashPassword !== user.password) {
      throw new Error("Incorrect password");
    }

    // Fixed: Added return statement & expiration option
    const token = JWT.sign(
      { id: user.id, email: user.email }, 
      secretKey, 
      { expiresIn: '1d' }
    );

    return token;
  }

  public static decodeJWTToken(token: string){
    return JWT.verify(token, secretKey)
  } 
}