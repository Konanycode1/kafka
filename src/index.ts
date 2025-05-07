import express, { Request, Response } from 'express';
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import { startKafkaProducer } from './kafka/kafka.producer';
import { startKafkaConsumer } from './kafka/kafka.consumer';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Exemple de route
// app.post('/api/messages', async (req: Request, res: Response) => {
//     try {
//       const message = req.body.message;
//       await startKafkaProducer('test-topic', message);
//       res.status(200).json({ status: 'Message sent' });
//     } catch (error) {
//       console.error('Error sending message:', error);
//       res.status(500).json({ error: 'Failed to send message' });
//     }
//   });
  
//   // Démarrer le consumer Kafka
//   startKafkaConsumer(['test-topic'])
//     .then(() => console.log('Kafka consumer started'))
//     .catch(err => console.error('Failed to start Kafka consumer:', err));
  

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});