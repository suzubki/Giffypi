import React from "react";
import "bootstrap";

export const Title = React.memo(() => {
    return (
        <div>
            <h1 className="p-4 text-warning text-center">Giffapi</h1>
        </div>
    );
});
