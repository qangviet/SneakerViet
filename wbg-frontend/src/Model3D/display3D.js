import React, { useEffect, useRef } from "react";
import Scene from "./scene";

const Display3D = ({ model }) => {
    const modelPath = "./keen_shoes.glb";
    return (
        <div>
            <Scene modelPath={modelPath} />
        </div>
    );
};

export default Display3D;
