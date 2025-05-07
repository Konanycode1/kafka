"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
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
