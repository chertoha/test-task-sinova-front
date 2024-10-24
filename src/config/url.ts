const API_URL = process.env.API_URL;

export const createImageApiUrl = (imageName: string) => `${API_URL}/uploads/${imageName}`;
