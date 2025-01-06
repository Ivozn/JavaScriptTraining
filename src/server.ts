import express from 'express';
import dotenv from 'dotenv';
import { getPlants } from './getPlants';

dotenv.config();
validateApiToken();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.post('/api/call', getPlants);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function validateApiToken() {
    if (!process.env.PLANT_API_TOKEN) {
        throw new Error("Plant API token is missing. Please set your API token in the .env file.");
    }
}