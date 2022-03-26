import axios from "axios";

export const getGifsSearch = async (giphy, controller) => {
    const results = await axios.get(
        `${process.env.REACT_APP_GIPHY_SEARCH_URL}`,
        {
            signal: controller.signal,
            params: {
                api_key: process.env.REACT_APP_GIPHY_KEY,
                q: giphy,
                limit: 6,
            },
        }
    );

    return results.data.data;
};
