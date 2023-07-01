import React from 'react'
import { Color, Vector3 } from 'three'
import { Canvas } from '@react-three/fiber'
import { Physics, useBox, useCircle, usePlane } from '@react-three/p2'
import { AdaptiveEvents, AdaptiveDpr, RoundedBox, Sphere } from '@react-three/drei'
import Effects from './Effects'
import Lights from './Lights'
import Player from './Player'
import { Stats } from '@react-three/drei'
import Debug from './components/Debug'

const PhysicsBox = () => {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 2] }))

  return (
    <group ref={ref}>
      <RoundedBox castShadow receiveShadow args={[1, 1, 1]} radius={0.05} smoothness={4}>
        <meshStandardMaterial attach="material" color="#f3f3f3" />
      </RoundedBox>
    </group>
  )
}

const PhysicsBall = () => {
  const [ref] = useCircle(() => ({ mass: 1, position: [0, 5] }))

  return (
    <group>
      <Sphere castShadow receiveShadow ref={ref}>
        <meshStandardMaterial attach="material" color="hotpink" />
      </Sphere>
    </group>
  )
}

const Plane = () => {
  const [ref] = usePlane(() => ({ mass: 0, position: [1, 0] }))
  return (
    <mesh receiveShadow ref={ref} position={[0, -0.1, 0]}>
      <boxGeometry args={[30, 0.01, 10]} />
      <meshStandardMaterial />
    </mesh>
  )
}

const bg = new Color('#020207')

const App = () => {
  return (
    <>
      <div className='w-screen h-screen'>
        <Canvas
          shadows
          mode='concurrent'
          performance={{ min: 0.75 }}
          dpr={Math.min(1, window.devicePixelRatio)}
          gl={{ alpha: false, antialias: false }}
          onCreated={({ gl }) => gl.setClearColor(bg)}
          camera={{ position: new Vector3(0, 0, 10) }}
        >
          <fog attach='fog' args={[bg, 4, 15]} />
          <Stats />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Effects />
          <Lights />
          <Physics
            maxSubSteps={5}
            gravity={[0, -10]}
            normalIndex={2}
            defaultContactMaterial={{
              friction: 0.9,
              restitution: 0.1,
              stiffness: 1e7,
              relaxation: 1,
              frictionStiffness: 1e7,
              frictionRelaxation: 2,
            }}
          >
            <Debug>
              <PhysicsBox />
              <PhysicsBall />
              <Player />
              <Plane />
            </Debug>
          </Physics>
        </Canvas>
      </div>
    </>
  )
}

export default App
