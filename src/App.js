import { useState } from "react";
// importación del componente Gif
import { FormSearch } from "./components/FormSearch";
import { Title } from "./components/Title";
// import Search from "./components/Search";

import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CarrousselGifs from "./components/CarrousselGifs";
import { DataContext } from "./helpers/dataContext";

function App() {
    const [dataGifs, setDataGifs] = useState({
        data: [],
        loading: true,
    });

    return (
        <div className="">
            <Title />
            <DataContext.Provider value={{
                dataGifs, setDataGifs
            }} >
                <FormSearch />
                <CarrousselGifs />
            </DataContext.Provider>
        </div>
    );
}

export default App;
