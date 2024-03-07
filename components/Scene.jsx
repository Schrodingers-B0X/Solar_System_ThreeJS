import useObjectSelect from '../hooks/useObjectSelect'
import useGravity from '../hooks/useGravity'
import { ExplosionProvider } from '../context/Explosions'

import Sun from './Sun'
import Stars from './Stars'
import Planets from './Planets'

// Scene component
const Scene = () => {
    // Custom hook for object selection
    useObjectSelect()

    // Custom hook for gravity logic
    useGravity()

    return (
        <ExplosionProvider>
            <Sun />

            <Planets />
            <Stars />
        </ExplosionProvider>
    )
}

export default Scene
