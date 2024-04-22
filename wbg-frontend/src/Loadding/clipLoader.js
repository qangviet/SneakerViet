import { ClipLoader } from "react-spinners";
import React from "react";
import { useState } from "react";

const override = {
    display: "block",
    margin: "0 auto",
};

const LoaddingClipLoader = ({ color, size }) => {
    let [loading, setLoading] = useState(true);
    return (
        <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={30}
            aria-label="Clip loadder"
            data-testid="loader"
        />
    );
};

export default LoaddingClipLoader;
