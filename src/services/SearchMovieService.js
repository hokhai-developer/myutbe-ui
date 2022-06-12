import * as httpRequest from '~/utils/httpRequest';
import {} from '~/';

export const searchMovie = async (query, page = '1') => {
  try {
    const res = await httpRequest.get(
      `search/keyword?api_key=${process.env.REACT_APP_API_KEY}`,
      {
        params: {
          query,
          page,
        },
      },
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
