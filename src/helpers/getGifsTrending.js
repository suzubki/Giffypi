import axios from "axios"

const getGifsTrending = async () => {
  const results = await axios.get(
    `${process.env.REACT_APP_GIPHY_TRENDING_URL}`,
    {
      params: {
        api_key: process.env.REACT_APP_GIPHY_KEY,
        limit: 12,
      },
    }
  );

  return results.data.data
}

export default getGifsTrending