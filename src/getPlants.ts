import { Request, Response } from 'express';
import axios from 'axios';
import { Plant } from './models/Plant';

export const getPlants = async (req: Request, res: Response) => {
    const { input } = req.body;
    const apiToken = process.env.PLANT_API_TOKEN;

    try {
        const apiResponse = await axios.get(`https://trefle.io/api/v1/plants?token=${apiToken}`);
        const filteredData = apiResponse.data.data.map((item: any) => {
            return new Plant(
                item.common_name ?? '',
                item.scientific_name ?? '',
                item.image_url ?? '');
        });
        res.json(filteredData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from the API' });
    }
};
