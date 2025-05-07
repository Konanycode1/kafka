
import { KAFKA_CONFIG } from "./config/config";
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';

const kafkaClient = KAFKA_CONFIG.KAFKA_CLIENT_ID || 'kafkaClient';
const kafkaBrokers = KAFKA_CONFIG.KAFKA_BROKER || 'localhost:9092';

const kafka = new Kafka({
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

let consumer: Consumer | null = null;

export async function initializeConsumer(): Promise<Consumer> {
  if (consumer) return consumer;

  const kafka = new Kafka({
    clientId: kafkaClient,
    brokers: [kafkaBrokers],
  });
  consumer = kafka.consumer({ groupId: `${kafkaClient}-group` });
  
  try {
    await consumer.connect();
    console.log('Consumer connected to Kafka');
    return consumer;
  } catch (error) {
    console.error('Failed to connect consumer:', error);
    throw error;
  }
}

export async function startKafkaConsumer(topics: string[]): Promise<void> {
  try {
    const kafkaConsumer = await initializeConsumer();
    
    // S'abonner à chaque topic
    for (const topic of topics) {
      await kafkaConsumer.subscribe({ topic, fromBeginning: true });
      console.log(`Subscribed to topic ${topic}`);
    }
    
    // Traiter les messages
    await kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        try {
          const value = message.value?.toString();
          if (value) {
            console.log({
              topic,
              partition,
              offset: message.offset,
              value: JSON.parse(value)
            });
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      }
    });
  } catch (error) {
    console.error('Error in Kafka consumer:', error);
    throw error;
  }
}
