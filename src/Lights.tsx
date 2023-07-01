import React, { useEffect, useRef } from 'react'
import { softShadows, useHelper } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3, CameraHelper } from 'three'
import type { DirectionalLight, OrthographicCamera } from 'three'
import { playerPos } from './stores/player'

softShadows({
  frustum: 1.75,
  size: 0.005,
  near: 2.5,
  samples: 5,
  rings: 11, // Rings (default: 11) must be a int
})

const pos = new Vector3()
pos.set(3, 5, 5)

const Lights = () => {
  const { scene, camera } = useThree()
  const mapsize = 10
  const shadowRef = useRef<OrthographicCamera>()
  const ref = useRef<DirectionalLight>()

  useHelper(shadowRef, CameraHelper, 1, 'hotpink')

  useFrame(() => {
    if (!ref.current) return
    
    const light = ref.current

    light.position.setX(pos.x + camera.position.x)
    light.target.position.setX(playerPos.x)
  })

  useEffect(() => {
    if (!ref.current) return
    shadowRef.current = ref.current.shadow.camera
  }, [ref, shadowRef])

  useEffect(() => {
    if (!ref.current) return
    scene.add(ref.current.target)
  }, [scene, ref])

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        ref={ref}
        castShadow
        position={pos}
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
