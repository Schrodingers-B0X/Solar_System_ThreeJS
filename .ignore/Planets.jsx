import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedRigidBodies } from '@react-three/rapier';
import { Vector3 } from 'three';

import { calculateInitialPosition, calculateInitialVelocity } from '../utils/planetCalculations';
import { useExplosion } from '../context/Explosions';
import { useTrails } from '../context/Trails';

import Planet from './Planet';

// Array of texture paths for each planet, assuming the array is ordered as desired
const textures = [
    '/js/solar/textures/mercury.jpg', 
    '/js/solar/textures/venus.jpg', 
    '/js/solar/textures/earth.jpg', 
    '/js/solar/textures/mars.jpg',
    '/js/solar/textures/jupiter.jpg',
    '/js/solar/textures/saturn.jpg',
    '/js/solar/textures/uranus.jpg',
    '/js/solar/textures/neptune.jpg'
];

const Planets = ({ count = 8 }) => {
    const { triggerExplosion } = useExplosion();
    const { addTrailPoint, clearTrail } = useTrails();

    const planetsRef = useRef();
    const [planetCount, setPlanetCount] = useState(count);

    const planetData = useMemo(() => {
        const planets = [];
        for (let i = 0; i < count; i++) {
            const position = calculateInitialPosition();
            const linearVelocity = calculateInitialVelocity(position);
            const scale = 0.5 + Math.random() * 1.5;
            const texturePath = textures[i % textures.length]; // Assign a texture based on the index
            planets.push({ key: 'planet_' + i, position, linearVelocity, scale, texturePath });
        }
        return planets;
    }, [count]);

    useEffect(() => {
        setPlanetCount(planetsRef.current.length);
    }, [planetsRef.current]);

    useFrame(() => {
        planetsRef.current?.forEach((planet) => {
            const position = planet.translation();
            addTrailPoint(planet.userData.key, new Vector3(position.x, position.y, position.z));
        });
    });

    // Handle collisions
    const handleCollision = ({ manifold, target, other }) => {
        console.log('Planet collision')

        // get the mass of both objects
        const targetMass = target.rigidBody.mass()
        const otherMass = other.rigidBody.mass()

        // If other object is more massive
        if (otherMass > targetMass) {
            // Get the collision and target positions
            const targetPosition = target.rigidBody.translation()
            const collisionWorldPosition = manifold.solverContactPoint(0)

            // Get the velocities of both objects
            const targetVelocity = target.rigidBody.linvel()
            const otherVelocity = other.rigidBody.linvel()

            // Calculate the combined velocity using conservation of momentum
            const combinedMass = targetMass + otherMass
            const combinedVelocity = new Vector3().addScaledVector(targetVelocity, targetMass).addScaledVector(otherVelocity, otherMass).divideScalar(combinedMass)

            // Set the combined velocity to the other
            if (other.rigidBody.userData.type === 'Planet') {
                other.rigidBody.setLinvel(combinedVelocity)
            }

            // Clear trail of the target planet
            clearTrail(target.rigidBody.userData.key)

            // Trigger explosion.
            triggerExplosion(
                new Vector3(collisionWorldPosition.x, collisionWorldPosition.y, collisionWorldPosition.z),
                new Vector3(targetPosition.x, targetPosition.y, targetPosition.z)
            )

            // Respawn the target planet
            const newPlanetData = newPlanet(true)

            target.rigidBody.userData.key = newPlanetData.key
            target.rigidBody.setTranslation(newPlanetData.position)
            target.rigidBody.setLinvel(newPlanetData.linearVelocity)
        }
    }

    return (
        <InstancedRigidBodies ref={planetsRef} instances={planetData} colliders='ball' onCollisionEnter={handleCollision}>
            {planetData.map((planet, index) => (
                <Planet key={planet.key} texturePath={planet.texturePath} count={1} />
            ))}
        </InstancedRigidBodies>
    );
}

export default Planets;