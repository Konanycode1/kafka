import dotenv from 'dotenv';

dotenv.config();
export const KAFKA_CONFIG = {
    KAFKA_BROKER: process.env.KAFKA_BROKER || 'localhost:9092',
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'kafkaClient',
}