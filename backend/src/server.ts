import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoute from './routes/chat.route.js';
dotenv.config();
const app = express();
const PORT= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get('/', (req,res) => {
    res.send('Travel Agent AI Backend is running Sucessfully !');
});
app.use('/api', chatRoute);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});