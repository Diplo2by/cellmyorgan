// services/IUserService.ts
import { User } from "next-auth";
export interface IUserService {
  signInCredentials(regid: string): Promise<User> | User;
}
