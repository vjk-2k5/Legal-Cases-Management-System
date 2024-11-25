import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/lcms/user', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});