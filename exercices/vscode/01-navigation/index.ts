/**
 * Point d'entrée de l'application
 */

import { UserService } from "./UserService";
import { config } from "./config";

async function main() {
  console.log(`Application démarrée en mode ${config.environment}`);

  const userService = new UserService();

  // Créer un utilisateur
  const newUser = await userService.createUser("Alice", "alice@example.com");
  console.log("Utilisateur créé:", newUser);

  // Récupérer tous les utilisateurs
  const users = await userService.getAllUsers();
  console.log("Tous les utilisateurs:", users);

  // Trouver un utilisateur par email
  const foundUser = await userService.findByEmail("alice@example.com");
  console.log("Utilisateur trouvé:", foundUser);
}

main().catch(console.error);
