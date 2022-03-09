import axios from "axios"

const getGifsSearch = async (giphy, abortController) => {

    const results = await axios.get(
        `https://${process.env.REACT_APP_GIPHY_SEARCH_URL}`,
        {
            signal: abortController.signal,
            params: {
                api_key: process.env.REACT_APP_GIPHY_KEY,
                q: giphy,
                limit: 12,
            },
        }
    );

    return results.data.data
}

export default getGifsSearch