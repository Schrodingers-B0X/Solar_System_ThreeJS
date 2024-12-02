import React, { useState, useEffect } from 'react';
import { Vector3 } from 'three';
import { RigidBody } from '@react-three/rapier';
import { calculateInitialPosition, calculateInitialVelocity } from '../utils/planetCalculations';
import Planet from './Planet';

const Planets = () => {
    const [planetData, setPlanetData] = useState([]);

    useEffect(() => {
        const planetsInfo = [
            { name: 'Mercury', texture: 'js/solar/textures/mercury.jpg', scale: 0.383 },
            { name: 'Venus', texture: 'js/solar/textures/venus.jpg', scale: 0.949 },
            { name: 'Earth', texture: 'js/solar/textures/earth.jpg', scale: 1.00 },
            { name: 'Mars', texture: 'js/solar/textures/mars.jpg', scale: 0.532 },
            { name: 'Jupiter', texture: 'js/solar/textures/jupiter.jpg', scale: 11.21 },
            { name: 'Saturn', texture: 'js/solar/textures/saturn.jpg', scale: 9.45 },
            { name: 'Uranus', texture: 'js/solar/textures/uranus.jpg', scale: 4.01 },
            { name: 'Neptune', texture: 'js/solar/textures/neptune.jpg', scale: 3.88 }
        ];
        setPlanetData(planetsInfo.map(info => {
            const position = calculateInitialPosition();
            const velocity = calculateInitialVelocity(position);
            return {
                ...info,
                position: position.toArray(),
                linearVelocity: velocity.toArray()
            };
        }));
    }, []);

    return (
        <>
            {planetData.map(planet => (
                <RigidBody
                    key={planet.name}
                    position={planet.position}
                    linearVelocity={planet.linearVelocity}
                    angularDamping={0.5}
                >
                    <Planet
                        name={planet.name}
                        texturePath={planet.texturePath}
                        scale={planet.scale}
                    />
                </RigidBody>
            ))}
        </>
    );
};

export default Planets;