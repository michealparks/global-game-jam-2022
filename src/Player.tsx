import React, { useEffect } from 'react'
import { useCapsule } from '@react-three/p2'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { playerPos, playerVel } from './stores/player'

const pressed = new Set<string>()

const input = { x: 0, y: 0 }
const impulse: [x: number, y: number] = [0, 0]
const worldPoint: [x: number, y: number] = [0, 0]

const VELOCITY_SCALE = 5

window.addEventListener('keydown', (e) => {
  pressed.add(e.key)
}, { passive: true })

window.addEventListener('keyup', (e) => {
  pressed.delete(e.key)
}, { passive: true })

const Player = () => {
  const [ref, api] = useCapsule(() => ({
    // type: 'Kinematic',
    mass: 20,
    position: [2, 3],
    args: [1, 0.5],
    angle: Math.PI / 2-0.01,
    fixedRotation: true,
  }))

  const { camera } = useThree()

  useEffect(() => {
    const u1 = api.position.subscribe((value) => playerPos.set(value[0], value[1], 10))
    const u2 = api.velocity.subscribe((value) => playerVel.set(value[0], value[1], 0))
    return () => {
      u1()
      u2()
    }
  }, [api])

  useFrame(() => {
    input.x = 0
    input.y = 0

    for (const key of pressed) {
      switch (key.toLowerCase()) {
        case 'w': case 'arrowup':
          input.y = 1
          break
        case 'a': case 'arrowleft':
          input.x = -1
          break
        case 's': case 'arrowdown':
          input.y = -1
          break
        case 'd': case 'arrowright':
          input.x = 1
          break
      }
    }

    if (input.x !== 0 || input.y !== 0) {
      impulse[0] = input.x * VELOCITY_SCALE
      impulse[1] = input.y * VELOCITY_SCALE
      api.applyImpulse(impulse, worldPoint)
      api.linearDamping.set(10)
      // api.velocity.set(MathUtils.clamp(vel.x, -1, 1), MathUtils.clamp(vel.y, -1, 1))

      
    }

    camera.position.lerp(playerPos, 0.1)
  })

  return (
    <group ref={ref}>
      <RoundedBox castShadow receiveShadow args={[2, 1, 1]} radius={0.5} smoothness={10}>
        <meshPhongMaterial attach="material" color="#f3f3f3" />
      </RoundedBox>
    </group>
  )
}

export default Player
