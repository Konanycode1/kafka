"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KAFKA_CONFIG = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.KAFKA_CONFIG = {
    KAFKA_BROKER: process.env.KAFKA_BROKER || 'localhost:9092',
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'kafkaClient',
};
