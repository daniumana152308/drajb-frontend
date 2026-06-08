import type { Client } from "../models/responses/Client";
import { config } from "../config";

const API_URL = `${config.api.url}/clients`;

export async function getClients(): Promise<Client[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error fetching clients");
        }

        return await response.json();

    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
}