import axios from 'axios';

const RESOURCE = 'https://pokeapi.co/api/v2';

class CustomApiError extends Error {
  constructor(
    public apiError: string,
    public message: string,
    public status: number,
  ) {
    super(`API Error: ${apiError}, Message: ${message}, Status: ${status}`);
  }
}

export default async ({
  offset,
  limit,
}: PaginateParamsRequest): Promise<PaginateResponse<PokeApiResult>> => {
  try {
    const response = await axios.get(`${RESOURCE}/pokemon?offset=${offset}&limit=${limit}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data, status } = error.response;
      throw new CustomApiError(data.error, data.message, status);
    }

    throw new Error(`Failed to get results from pokeapi: ${error}`);
  }
};
