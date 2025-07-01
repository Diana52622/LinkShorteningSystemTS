import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import router from "./routes/route";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Система сокращения ссылок');
});

app.listen(PORT, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log(`Server started on port ${PORT}`);
});