
import { KAFKA_CONFIG } from "./config/config";
import { Kafka, Consumer, EachMessagePayload, Producer } from 'kafkajs';
const kafkaClient = KAFKA_CONFIG.KAFKA_CLIENT_ID || 'kafkaClient';
const kafkaBrokers = KAFKA_CONFIG.KAFKA_BROKER || 'localhost:9092';

const kafka = new Kafka({
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


let producer: Producer | null = null;

export async function initializeProducer(): Promise<Producer> {
  if (producer) return producer;

  const kafka = new Kafka({
    clientId: kafkaClient,
    brokers: [kafkaBrokers],
  });
  producer = kafka.producer();
  
  try {
    await producer.connect();
    console.log('Producer connected to Kafka');
    return producer;
  } catch (error) {
    console.error('Failed to connect producer:', error);
    throw error;
  }
}

export async function startKafkaProducer(topic: string, message: any): Promise<void> {
  try {
    const kafkaProducer = await initializeProducer();
    
    await kafkaProducer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }]
    });
    
    console.log(`Message sent to topic ${topic}`);
  } catch (error) {
    console.error('Error in Kafka producer:', error);
    throw error;
  }
}

