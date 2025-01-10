import axios from 'axios';
import { Request, Response } from 'express';

const BASE_URL = 'https://trefle.io/api/v1/plants';

export const searchPlant = async (req: Request, res: Response) => {
    const { searchValue } = req.body;
    const apiToken = process.env.PLANT_API_TOKEN;

    if (!searchValue) {
        res.status(400).json({ error: 'Invalid search value' });
        return;
    }

    if (!apiToken) {
        res.status(400).json({ error: 'API token is missing. Please provide a valid token.' });
        return;
    }

    try {
        const plantId = await fetchPlantId(apiToken, searchValue);
        if (!plantId) {
            res.status(404).json({ error: 'Plant not found' });
            return;
        }

        const plantDetails = await searchForPlantDetails(apiToken, plantId);
        res.json(plantDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from the API' });
    }
};

const fetchPlantId = async (apiToken: string, searchValue: string) => {
    const searchResponse = await axios.get(BASE_URL, {
        params: {
            token: apiToken,
            filter: {
                common_name: searchValue
            },
        }
    });

    const plantData = searchResponse.data.data;
    if (isValidPlantData(plantData)) {
        return plantData[0].id;
    } else {
        return null;
    }
};

const isValidPlantData = (plantData: any[]): boolean => {
    return plantData && plantData.length > 0 && plantData[0].id;
};

const searchForPlantDetails = async (apiToken: string, plantId: any) => {
    const plantUrl = `${BASE_URL}/${plantId}`;
    const detailedResponse = await axios.get(plantUrl, { params: { token: apiToken } });
    return detailedResponse.data;
}

