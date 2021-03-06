import React from 'react'
import { softShadows } from '@react-three/drei'

softShadows({
  frustum: 1.75,
  size: 0.005,
  near: 2.5,
  samples: 30,
  rings: 11, // Rings (default: 11) must be a int
})

const Lights = () => {
  const mapsize = 6

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        castShadow
        position={[6, 5, 6]}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={25}
        shadow-camera-left={-mapsize}
        shadow-camera-right={mapsize}
        shadow-camera-top={mapsize}
        shadow-camera-bottom={-mapsize}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
      <rectAreaLight
        color="red"
        intensity={0.3}
        position={[1.5, -1, 3]}
        width={10}
        height={10}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
    </>
  )
}

export default Lights
