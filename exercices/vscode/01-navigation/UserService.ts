/**
 * Service de gestion des utilisateurs
 */

import { User, createUserId, formatUser } from "./User";
import { config } from "./config";

export class UserService {
  private users: User[] = [];

  async createUser(name: string, email: string): Promise<User> {
    const user: User = {
      id: createUserId(),
      name,
      email,
      createdAt: new Date(),
    };

    this.users.push(user);

    if (config.debug) {
      console.log(`[DEBUG] Utilisateur créé: ${formatUser(user)}`);
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}
