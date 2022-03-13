import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Form, FormGroup } from "reactstrap";
import { useSearchParams } from "react-router-dom";

import CardGif from "../components/CardGif";

import 'bootstrap';
import getGifsTrending from "../helpers/getGifsTrending";
import getGifsSearch from "../helpers/getGifsSearch";

export const Search = () => {
  const [fatherData, setFatherData ] = useState({
    data: [],
    loading: true,
  });

  const isMounted = useRef(true)

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

  // getGifsTrending
  useEffect(() => {
    getGifsTrending().then(res => {
      setFatherData({
        data: [...res],
        loading: true,
      })
    })

    return () => {       
      isMounted.current = false
    }
  }, []);

  // getGifsSearch
  useEffect(() => {
    let abortController = new AbortController();
    
    setFatherData({
      data: [],
      loading: false
    })

    if (giphy){
      getGifsSearch(giphy, abortController).then(res => {

        
        setTimeout(() => {
          if ( isMounted.current ) {
            setFatherData({
              data: [...res],
              loading: true
            })  
          }
        }, 3000);
      })
    };
    
    return () => {
      abortController.abort();
    };
  }, [giphy]);
  
  return (
    <div>
      <Form onSubmit={handleSubmit} className="mb-4" >
        <FormGroup>
          <Input defaultValue={giphy || ""} name="giphy" autoComplete="off" />
        </FormGroup>
        <Button type="submit" color="primary">
          Search
        </Button>
      </Form>
      <CardGif objectData={fatherData} />
    </div>
  );
};

export default Search;
