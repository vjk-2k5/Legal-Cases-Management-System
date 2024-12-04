import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import clientRoutes from './routes/clientRoutes';
import lawyerRoutes from './routes/lawyerRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/lcms/user', userRoutes);
app.use('/lcms/client', clientRoutes);
app.use('/lcms/lawyer', lawyerRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});