import React from 'react'
import { Color, Vector3, Euler } from 'three'
import { Canvas } from '@react-three/fiber'
import { AdaptiveEvents, AdaptiveDpr, Box, Plane } from '@react-three/drei'
import Effects from './Effects'
import Lights from './Lights'

const bg = new Color('#020207')

const App = () => {
  return (
    <>
      <div className='w-screen h-screen'>
        <Canvas
          shadows
          mode='concurrent'
          performance={{ min: 0.75 }}
          dpr={Math.min(1.5, window.devicePixelRatio)}
          gl={{ alpha: false, antialias: false }}
          onCreated={({ gl }) => gl.setClearColor(bg)}
          camera={{ position: new Vector3(2, 2, 2) }}
        >
          <fog attach='fog' args={[bg, 4, 15]} />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Effects />
          <Lights />
          <Box castShadow receiveShadow position={[0, 0.5, 0]}>
            <meshStandardMaterial attach="material" color="hotpink" />
          </Box>
          <Plane castShadow receiveShadow scale={3} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial attach="material" color="#f3f3f3" />
          </Plane>
        </Canvas>
      </div>
    </>
  )
}

export default App
