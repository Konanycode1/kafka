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
exports.initializeConsumer = initializeConsumer;
exports.startKafkaConsumer = startKafkaConsumer;
const config_1 = require("./config/config");
const kafkajs_1 = require("kafkajs");
const kafkaClient = config_1.KAFKA_CONFIG.KAFKA_CLIENT_ID || 'kafkaClient';
const kafkaBrokers = config_1.KAFKA_CONFIG.KAFKA_BROKER || 'localhost:9092';
const kafka = new kafkajs_1.Kafka({
    clientId: kafkaClient,
    brokers: [kafkaBrokers],
});
//initialize consumer
// const consumer = kafka.consumer({ groupId: `${kafkaClient}-group` });
// const startConsumer = async () => {
//     try {
//         await consumer.connect();
//         console.log("Consumer connected to Kafka broker");
//         await consumer.subscribe({ topic: kafkaClient, fromBeginning: true });
//         console.log("Consumer subscribed to topic userInfo");
//         await consumer.run({
//             eachMessage: async ({ topic, partition, message }) => {
//                 const value = message.value?.toString() || '';
//                 console.log(`Received message: ${value}`);
//             },
//         });
//     } catch (error) {
//         console.error("Error starting consumer:", error);
//     }
// }
// startConsumer().catch((err) => {
//     console.error("Une erreur s'est produite lors du démarrage du consumer:", err);
//   }
// );
let consumer = null;
function initializeConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (consumer)
            return consumer;
        const kafka = new kafkajs_1.Kafka({
            clientId: kafkaClient,
            brokers: [kafkaBrokers],
        });
        consumer = kafka.consumer({ groupId: `${kafkaClient}-group` });
        try {
            yield consumer.connect();
            console.log('Consumer connected to Kafka');
            return consumer;
        }
        catch (error) {
            console.error('Failed to connect consumer:', error);
            throw error;
        }
    });
}
function startKafkaConsumer(topics) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const kafkaConsumer = yield initializeConsumer();
            // S'abonner à chaque topic
            for (const topic of topics) {
                yield kafkaConsumer.subscribe({ topic, fromBeginning: true });
                console.log(`Subscribed to topic ${topic}`);
            }
            // Traiter les messages
            yield kafkaConsumer.run({
                eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                    var _b;
                    try {
                        const value = (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString();
                        if (value) {
                            console.log({
                                topic,
                                partition,
                                offset: message.offset,
                                value: JSON.parse(value)
                            });
                        }
                    }
                    catch (error) {
                        console.error('Error processing message:', error);
                    }
                })
            });
        }
        catch (error) {
            console.error('Error in Kafka consumer:', error);
            throw error;
        }
    });
}
