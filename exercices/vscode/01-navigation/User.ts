/**
 * Modèle utilisateur
 */

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export function createUserId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function formatUser(user: User): string {
  return `${user.name} <${user.email}>`;
}
