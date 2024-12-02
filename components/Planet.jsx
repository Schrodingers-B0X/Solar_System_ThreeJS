import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, SphereGeometry, MeshStandardMaterial } from 'three';
import { useCamera } from '../context/Camera';

const Planet = ({ name, texturePath, scale }) => {
    const texture = useLoader(TextureLoader, texturePath);
    const geometry = new SphereGeometry(scale, 32, 32);
    const material = new MeshStandardMaterial({ map: texture });
    const { handleFocus } = useCamera();

    return (
        <mesh onClick={handleFocus} castShadow receiveShadow>
            <primitive attach="geometry" object={geometry} />
            <primitive attach="material" object={material} />
        </mesh>
    );
};

export default Planet;
