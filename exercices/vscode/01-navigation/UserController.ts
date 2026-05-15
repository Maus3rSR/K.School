/**
 * Contrôleur HTTP pour les utilisateurs
 */

import { UserService } from "./UserService";
import { User, formatUser } from "./User";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async handleCreateUser(name: string, email: string): Promise<string> {
    const user = await this.userService.createUser(name, email);
    return JSON.stringify({ success: true, user });
  }

  async handleGetAllUsers(): Promise<string> {
    const users = await this.userService.getAllUsers();
    return JSON.stringify({ success: true, users });
  }

  async handleFindUser(email: string): Promise<string> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return JSON.stringify({ success: false, error: "User not found" });
    }

    return JSON.stringify({ success: true, user, formatted: formatUser(user) });
  }

  async handleDeleteUser(id: string): Promise<string> {
    const deleted = await this.userService.deleteUser(id);
    return JSON.stringify({ success: deleted });
  }
}
