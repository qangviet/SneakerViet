import React from "react";
import { useState } from "react";

import MoonLoader from "react-spinners/MoonLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const LoaddingSpiner = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("blue");

    return (
        <div className="w-[full] h-[full] bg-white">
            <MoonLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={45}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default LoaddingSpiner;
