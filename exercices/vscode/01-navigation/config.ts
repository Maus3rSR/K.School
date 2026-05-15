/**
 * Configuration de l'application
 */

export const config = {
  environment: "development",
  debug: true,
  database: {
    host: "localhost",
    port: 5432,
    name: "users_db",
  },
  api: {
    port: 3000,
    prefix: "/api/v1",
  },
};
