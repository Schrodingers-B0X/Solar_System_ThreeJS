import React, { useRef } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { useCamera } from '../context/Camera';

const Planet = ({ texturePath }) => {
    const mesh = useRef();
    const { handleFocus } = useCamera();

    const texture = useLoader(TextureLoader, texturePath); // Use the passed texture path

    return (
        <instancedMesh ref={mesh} onClick={handleFocus} castShadow receiveShadow>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </instancedMesh>
    );
}

export default Planet;