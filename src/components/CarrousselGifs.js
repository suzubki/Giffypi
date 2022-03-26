import React, { useContext, useEffect } from "react";

// React slick (carousel)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Reactstrap
import { Card } from "reactstrap";

// CSS
import "./CarrousselGifs.css";
import getGifsTrending from "../helpers/getGifsTrending";
import { DataContext } from "../helpers/dataContext";
import { useSearchParams } from "react-router-dom";
import { getGifsSearch } from "../helpers/getGifsSearch";

export const CarrousselGifs = () => {
    const { dataGifs, setDataGifs } = useContext(DataContext);
    const [searchParams] = useSearchParams();

    const query = searchParams.get("giphy");

    // Call API - Trending and Search endpoint and monitorize the call api
    useEffect(() => {
        if (!query) {
            console.log("asdasds");
            getGifsTrending()
                .then((res) => {
                    console.log("Llamado a gifsTrending");
                    setDataGifs({
                        data: [...res],
                        loading: false,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        const controller = new AbortController();

        if (query) {
            setDataGifs({ data: [], loading: true });
            getGifsSearch(query, controller)
                .then((res) => {
                    setDataGifs({
                        data: [...res],
                        loading: false,
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        return () => {
            controller.abort();
        };
    }, [setDataGifs, query]);

    // Slick settings
    const settings = {
        infinite: true,
        autoplay: true,
        adaptiveHeigh: true,
        speed: 2000,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "10px",
        initialSlide: 0,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Render card gif
    return (
        <div
            className="text-center"
            style={{
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "80vw",
                height: "auto",
            }}
        >
            {/* data found = 0 and loading = false ? No elements to render */}
            {dataGifs.data?.length === 0 && dataGifs.loading === false && (
                <h1 className="text-white text-center mt-4 ">
                    No se encontraron resultados
                </h1>
            )}

            {/* Show 'Cargando...' or render Slick */}
            {dataGifs.loading ? (
                <h1 className="text-white text-center mt-4 ">Cargando...</h1>
            ) : (
                <Slider {...settings}>
                    {dataGifs.data?.map((gif) => (
                        <Card key={gif.id}>
                            <img
                                alt="Card cap"
                                className="card_image--margin"
                                src={gif.images.original.url}
                                width="90%"
                            />
                        </Card>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default CarrousselGifs;
