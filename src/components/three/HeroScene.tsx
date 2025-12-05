import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Octahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Particle field component
const ParticleField = ({ count = 500, mouse }: { count?: number; mouse: React.RefObject<{ x: number; y: number }> }) => {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
    
    if (mouse.current) {
      mesh.current.rotation.y += mouse.current.x * 0.0001;
      mesh.current.rotation.x += mouse.current.y * 0.0001;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#1ea7ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Industrial mesh/engine component
const IndustrialDevice = ({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const [hue, setHue] = useState(0.55);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = state.clock.elapsedTime;
    
    // Base rotation
    groupRef.current.rotation.y = t * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    
    // Mouse influence
    if (mouse.current) {
      groupRef.current.rotation.y += mouse.current.x * 0.0003;
      groupRef.current.rotation.x += mouse.current.y * 0.0003;
    }

    if (innerRef.current) {
      innerRef.current.rotation.z = t * 0.5;
    }
    if (outerRef.current) {
      outerRef.current.rotation.z = -t * 0.3;
    }

    // Color shift
    setHue(0.55 + Math.sin(t * 0.2) * 0.1);
  });

  const color = useMemo(() => new THREE.Color().setHSL(hue, 1, 0.5), [hue]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Core icosahedron */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Icosahedron ref={innerRef} args={[1, 1]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            wireframe
            distort={0.2}
            speed={2}
          />
        </Icosahedron>
      </Float>

      {/* Outer octahedron frame */}
      <Octahedron ref={outerRef} args={[1.8, 0]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#1ea7ff" wireframe transparent opacity={0.3} />
      </Octahedron>

      {/* Orbital rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI * 0.3 * i, Math.PI * 0.2 * i, 0]}>
          <torusGeometry args={[2.2 + i * 0.3, 0.02, 16, 100]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(hue + i * 0.05, 1, 0.5)}
            transparent
            opacity={0.4 - i * 0.1}
          />
        </mesh>
      ))}

      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

// Camera controller
const CameraController = ({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) => {
  const { camera } = useThree();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Base camera drift
    camera.position.x = Math.sin(t * 0.1) * 0.5;
    camera.position.y = Math.cos(t * 0.15) * 0.3;
    
    // Mouse influence on camera
    if (mouse.current) {
      camera.position.x += mouse.current.x * 0.001;
      camera.position.y += -mouse.current.y * 0.001;
    }
    
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main scene
const Scene = ({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) => {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 25]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#1ea7ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
      
      <CameraController mouse={mouse} />
      <IndustrialDevice mouse={mouse} />
      <ParticleField count={800} mouse={mouse} />
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </>
  );
};

export const HeroScene = () => {
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
        <Scene mouse={mouseRef} />
      </Canvas>
    </div>
  );
};
