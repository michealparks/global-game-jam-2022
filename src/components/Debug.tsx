import React, { ReactElement } from 'react'
import { Debug as PhysicsDebug } from '@react-three/p2'

const Debug = ({ children }: { children: React.ReactNode }): ReactElement => {
  const debug = false

  if (debug) {
    return (
      <PhysicsDebug normalIndex={2} linewidth={0.001}>
        {children}
      </PhysicsDebug>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default Debug
