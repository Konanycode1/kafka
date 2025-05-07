"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeProducer = initializeProducer;
exports.startKafkaProducer = startKafkaProducer;
const config_1 = require("./config/config");
const kafkajs_1 = require("kafkajs");
const kafkaClient = config_1.KAFKA_CONFIG.KAFKA_CLIENT_ID || 'kafkaClient';
const kafkaBrokers = config_1.KAFKA_CONFIG.KAFKA_BROKER || 'localhost:9092';
const kafka = new kafkajs_1.Kafka({
    clientId: kafkaClient,
    brokers: [kafkaBrokers],
});
//initialize producer
// const producer = kafka.producer();
//les etape de l'initialisation du producer
// const startProducer = async (data: any) => {
//     try {
//         await producer.connect();
//         console.log("Producer connected to Kafka broker");
//         const convertedData = JSON.stringify(data)
//         await producer.send({
//             topic: "userInfo",
//             messages: [
//                 { value: convertedData },
//             ],
//         });
//         console.log("Message sent successfully");
//     }
//     catch (error) {
//         console.error("Error sending message:", error);
//     }
//     finally {
//         await producer.disconnect();
//         console.log("Producer disconnected from Kafka broker");
//     }
// }
let producer = null;
function initializeProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (producer)
            return producer;
        const kafka = new kafkajs_1.Kafka({
            clientId: kafkaClient,
            brokers: [kafkaBrokers],
        });
        producer = kafka.producer();
        try {
            yield producer.connect();
            console.log('Producer connected to Kafka');
            return producer;
        }
        catch (error) {
            console.error('Failed to connect producer:', error);
            throw error;
        }
    });
}
function startKafkaProducer(topic, message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const kafkaProducer = yield initializeProducer();
            yield kafkaProducer.send({
                topic,
                messages: [{ value: JSON.stringify(message) }]
            });
            console.log(`Message sent to topic ${topic}`);
        }
        catch (error) {
            console.error('Error in Kafka producer:', error);
            throw error;
        }
    });
}
