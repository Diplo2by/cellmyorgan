// services/UserService.ts
import { User } from "next-auth";
import { IUserService } from "./IUserService";
const users = require("data/users.json") 

export class InMemoryUserService implements IUserService {
  signInCredentials(regid: string): User | Promise<User> {
    const user = users.find((user) => {
      const isRegCorrect = regid === user.regid;
      return isRegCorrect;
    }) as User;
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return user;
  }
}

export const userService = new InMemoryUserService();