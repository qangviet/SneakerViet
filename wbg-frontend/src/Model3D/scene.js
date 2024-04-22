import React, { useEffect, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model3D = ({ modelPath }) => {
    const gltf = useLoader(GLTFLoader, modelPath);
    return <primitive object={gltf.scene} scale={0.5} />;
};

const Scene = ({ modelPath }) => (
    <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model3D modelPath={modelPath} />
    </Canvas>
);

export default Scene;
