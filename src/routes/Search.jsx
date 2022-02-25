import React, { useState, useEffect } from "react";
import { Input, Button, Form, FormGroup } from "reactstrap";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import CardGif from "../components/CardGif";

import 'bootstrap';

export const Search = () => {
  const [fatherData, setFatherData ] = useState([]);

  // LLamado API Trending
  useEffect(() => {
    // Data trending
    const fetchData = async () => {
      const results = await axios.get(
        `${process.env.REACT_APP_GIPHY_TRENDING_URL}`,
        {
          params: {
            api_key: process.env.REACT_APP_GIPHY_KEY,
            limit: 12,
          },
        }
      );
      setFatherData(results.data.data)
      // setDataTrending(results.data.data);
    };

    fetchData();
  }, []);


  //  useSearchParams
  let [searchParams, setSearchParams] = useSearchParams();
  let giphy = searchParams.get("giphy");

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let newGiphy = formData.get("giphy");

    if (!newGiphy) return;
    setSearchParams({ giphy: newGiphy });
  };

  // Llamado a la API -- Search API
  useEffect(() => {
    let abortController = new AbortController();

    async function getGiphy() {
      let response = await axios.get(
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

      setFatherData(response.data.data)
      // setGiphyData(response.data.data);
    }
    if (giphy) return getGiphy();
    
    return () => {
      abortController.abort();
    };
  }, [giphy]);

  return (
    <div>
      <Form onSubmit={handleSubmit} className="mb-4" >
        <FormGroup>
          <Input defaultValue={giphy || ""} name="giphy" />
        </FormGroup>
        <Button type="submit" color="primary">
          Search
        </Button>
      </Form>
      <CardGif data={fatherData} />
    </div>
  );
};

export default Search;
