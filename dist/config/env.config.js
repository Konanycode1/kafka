"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.requireEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
// Déterminer l'environnement
const environment = process.env.NODE_ENV || 'development';
// Chemins des fichiers .env
const defaultEnvPath = path_1.default.resolve(process.cwd(), '.env');
const envPath = path_1.default.resolve(process.cwd(), `.env.${environment}`);
// Charger d'abord le fichier .env par défaut
if (fs_1.default.existsSync(defaultEnvPath)) {
    dotenv_1.default.config({ path: defaultEnvPath });
}
// Puis surcharger avec le fichier spécifique à l'environnement
if (fs_1.default.existsSync(envPath)) {
    dotenv_1.default.config({ path: envPath });
}
// Fonction pour valider la présence d'une variable d'environnement requise
const requireEnv = (key) => {
    const value = process.env[key];
    if (typeof value === 'undefined') {
        throw new Error(`Environment variable "${key}" is required but was not found.`);
    }
    return value;
};
exports.requireEnv = requireEnv;
// Variables d'environnement exportées
exports.env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3000', 10),
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
    isTest: process.env.NODE_ENV === 'test',
};
