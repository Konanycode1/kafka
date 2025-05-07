import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();
// Déterminer l'environnement
const environment = process.env.NODE_ENV || 'development';

// Chemins des fichiers .env
const defaultEnvPath = path.resolve(process.cwd(), '.env');
const envPath = path.resolve(process.cwd(), `.env.${environment}`);

// Charger d'abord le fichier .env par défaut
if (fs.existsSync(defaultEnvPath)) {
  dotenv.config({ path: defaultEnvPath });
}

// Puis surcharger avec le fichier spécifique à l'environnement
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Fonction pour valider la présence d'une variable d'environnement requise
export const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (typeof value === 'undefined') {
    throw new Error(`Environment variable "${key}" is required but was not found.`);
  }
  return value;
};

// Interface des variables d'environnement utilisées
interface Env {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
}

// Variables d'environnement exportées
export const env: Env = {
  NODE_ENV: (process.env.NODE_ENV as Env['NODE_ENV']) || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
  isTest: process.env.NODE_ENV === 'test',
};
