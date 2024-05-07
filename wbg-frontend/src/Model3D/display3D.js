import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model1 = ({ data, scale }) => {
    let gltf = useGLTF(data); // hoặc .glb
    return (
        <mesh scale={scale}>
            <primitive object={gltf.scene} />
        </mesh>
    );
};

const Model2 = ({ data, scale }) => {
    let gltf = useLoader(GLTFLoader, data);
    return (
        <mesh scale={scale}>
            <primitive object={gltf.scene} />
        </mesh>
    );
};

const Display3D = ({ fileData, pathFile, type }) => {
    const [scale, setScale] = useState([10, 10, 10]);
    console.log(fileData, pathFile, type);
    return (
        <Canvas>
            <ambientLight intensity={5} />
            <Suspense fallback={null}>
                {type === "data" ? (
                    <Model1 data={fileData} scale={scale} />
                ) : (
                    <Model2 data={pathFile} scale={scale} />
                )}
                <OrbitControls minZoom={5} />
            </Suspense>
        </Canvas>
    );
};

export default Display3D;
