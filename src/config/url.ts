const API_URL = process.env.API_URL;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createImageApiUrl = (imageName: string) => `${API_URL}/uploads/${imageName}`;

export const createClientImageApiUrl = (imageName: string) =>
  `${NEXT_PUBLIC_API_URL}/uploads/${imageName}`;
