import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Animated mesh gradient shader
const gradientShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#6B46C1') },
    uColor2: { value: new THREE.Color('#EC4899') },
    uColor3: { value: new THREE.Color('#06B6D4') },
    uColor4: { value: new THREE.Color('#1A1A2E') },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    varying vec2 vUv;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Animated noise
      float noise1 = snoise(uv * 2.0 + uTime * 0.1);
      float noise2 = snoise(uv * 3.0 - uTime * 0.15);
      float noise3 = snoise(uv * 1.5 + uTime * 0.08);
      
      // Create moving color points
      vec2 point1 = vec2(0.3 + sin(uTime * 0.2) * 0.2, 0.3 + cos(uTime * 0.15) * 0.2);
      vec2 point2 = vec2(0.7 + cos(uTime * 0.18) * 0.2, 0.6 + sin(uTime * 0.22) * 0.2);
      vec2 point3 = vec2(0.5 + sin(uTime * 0.25) * 0.25, 0.5 + cos(uTime * 0.2) * 0.15);
      
      // Calculate distances to color points
      float dist1 = length(uv - point1) + noise1 * 0.15;
      float dist2 = length(uv - point2) + noise2 * 0.15;
      float dist3 = length(uv - point3) + noise3 * 0.15;
      
      // Mix colors based on distances
      vec3 color = uColor4;
      color = mix(color, uColor1, smoothstep(0.6, 0.0, dist1));
      color = mix(color, uColor2, smoothstep(0.5, 0.0, dist2) * 0.7);
      color = mix(color, uColor3, smoothstep(0.4, 0.0, dist3) * 0.5);
      
      // Add subtle noise texture
      float fineNoise = snoise(uv * 10.0 + uTime * 0.05) * 0.03;
      color += fineNoise;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

// Mesh component with shader material
const GradientMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: gradientShader.uniforms,
        vertexShader: gradientShader.vertexShader,
        fragmentShader: gradientShader.fragmentShader,
      }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[4, 4, 1, 1]} />
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
};

// Floating geometric shapes
const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
        child.rotation.x += 0.002;
        child.rotation.z += 0.001;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Torus */}
      <mesh position={[-1.5, 0.5, -1]}>
        <torusGeometry args={[0.3, 0.1, 16, 100]} />
        <meshBasicMaterial color="#6B46C1" transparent opacity={0.3} />
      </mesh>
      
      {/* Icosahedron */}
      <mesh position={[1.2, -0.3, -0.5]}>
        <icosahedronGeometry args={[0.25, 0]} />
        <meshBasicMaterial color="#EC4899" transparent opacity={0.25} wireframe />
      </mesh>
      
      {/* Octahedron */}
      <mesh position={[0.5, 0.8, -1.2]}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.3} />
      </mesh>
      
      {/* Sphere */}
      <mesh position={[-0.8, -0.6, -0.8]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#6B46C1" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <GradientMesh />
        <FloatingShapes />
      </Canvas>
      
      {/* Overlay to soften the background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(250, 251, 252, 0.4) 100%)',
        }}
      />
    </div>
  );
};

export default ThreeBackground;
