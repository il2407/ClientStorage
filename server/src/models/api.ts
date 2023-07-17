import axios, { AxiosResponse } from "axios";

interface IpApiResponse {
  city: string;
  country: string;
}

export const fetchLocationFromIp = async (
  ip: string
): Promise<IpApiResponse> => {
  try {
    const response: AxiosResponse<IpApiResponse> = await axios.get(
      `http://ip-api.com/json/${ip}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch location from IP: ${error}`);

    throw error;
  }
};
