import React from "react";
import { Input, Button, Form } from "reactstrap";
import { useSearchParams } from "react-router-dom";
// import { useGifsSearch } from "../helpers/useGifsSearch";

export const FormSearch = () => {
    //  useSearchParams
    let [searchParams, setSearchParams] = useSearchParams();
    let giphy = searchParams.get("giphy");

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let newGiphy = formData.get("giphy");

        if (!newGiphy) return;
        if (giphy === newGiphy) return;

        setSearchParams({ giphy: newGiphy });
    };

    return (
        <div>
            <Form
                onSubmit={handleSubmit}
                className="p-2"
                style={{
                    maxWidth: "1000px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <Input
                    defaultValue={giphy || ""}
                    name="giphy"
                    autoComplete="off"
                />
                <Button type="submit" className="mt-2" color="primary">
                    Search
                </Button>
            </Form>
        </div>
    );
};
