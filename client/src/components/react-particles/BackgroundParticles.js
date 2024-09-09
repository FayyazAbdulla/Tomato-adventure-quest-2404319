import React from 'react'
import Particles from 'react-tsparticles';
import particlesConfig from './particlesConfig';

function BackgroundParticles() {
  return (
    <Particles params={particlesConfig}> </Particles>
  );
}

export default BackgroundParticles